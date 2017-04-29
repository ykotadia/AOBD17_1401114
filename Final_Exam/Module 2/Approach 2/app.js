var express=require('express');
var fs=require('fs');
var HashMap=require('hashmap');
var app=express();
var jobs=fs.readFileSync('jobs.json');
var jobs=JSON.parse(jobs);
var map=new HashMap();
var array=[];

//here jobs contain all the element in the form of javaScript object
// forEach function iterate through Every item of of jobs.
jobs.forEach(function(arrayitem) {
	// body...
	role=arrayitem.role;
	array.push(role); // push the role  in array for searching purpose
	role=role.toLowerCase();
	if(map.get(role)) //check if the same role already present in the map if yes, then append the skill set with given skill
	{
		var skills=[]; 
		var skills=arrayitem.skills; // 

		map.set(role, map.get(role).concat(skills)); // concat in previous skills of the same role
	}
	else
	{
		map.set(role,arrayitem.skills); // if this is for the first time, simply add the skill corresponding the new role.
	}

});
// in order to remove the duplicate value out of the array of job roles.
uniqueArray = array.filter(function(elem, pos) {
    return array.indexOf(elem) == pos;
});


// search route in order to set all the roles for autocomplete.
app.get('/search',function(req,res) {
	// body...
res.send(uniqueArray); 

});


// return the required skills set according to the job type.

app.get('/jobs/:jobtype',function(req,res){
var jobtype=req.params.jobtype; //fetch the job string from the route
var myArray=map.get(jobtype.toLowerCase()); // myArray contain array of skills corresponding particular type of job.  the given array contain multiple skills repeated no of times.
//console.log(myArray);


/*
the reduce function going to map the skills set according to the number of times the given skill ocuur.
eg:
html:5
php:4
*/
var c = myArray.reduce(function(a, b) {  
  a[b] = ++a[b] || 1;
  return a;
}, {});
var keys = Object.keys(c);
//finally we arrange the most required skills first and return to the calling function in controller using res.send(result);
var result= keys.sort(function(a, b) {
  if (c[a] < c[b]) {
    return 1;
  } else {
    return -1;
  }
}).map(function(a) {return String(a)});
res.send(result);
});


app.use(express.static(__dirname+'/public'));
app.listen(3000,function(err){
	if(err)
		throw err;
	console.log("Server listening at 3000");
});

import csv
from pprint import pprint
import re
import operator
new_list=[]
with open('/home/ratnesh/Desktop/AOBD_Recommendor/Candidate Profile Data/data_csv/Automation Test Engineer.csv','rb') as f:
    reader = csv.reader(f,delimiter=',')
    c_id=[]
    skill=[]
    combine=[]
    new_list=[]
    weight_list=[]
    weight_skill=[]
    comb_weight_skill=[]
    for col in reader:
        c_id.append(col[0])
        skill.append(col[2])
    combine=zip(c_id,skill)
    #print len(combine)
    for i in range(1,len(combine)):
        new_list.append(combine[i][1])
    str1 = ''.join(new_list)
    str2 = re.sub("[\(\[].*?[\)\]]", "", str1)
    #print str2
    str2 = str2.replace('.',',').replace(';',',').replace('\xe2\x80\x93',',')
    list_1 = str2.split(',')
    #pprint(list_1)
    str4 = ''.join(list_1)
    str4=str4.lower()
#    print   str4.count('python')
#    print len(list_1)
    for i in list_1:
        weight = str4.count(i)
        #print i,'occurs: ', weight
        if weight>0:
            weight_list.append(weight)
            weight_skill.append(i)
        comb_weight_skill=zip(weight_skill,weight_list)
    #print comb_weight_skill.sort(key=lambda t: t[1])
    #print 'Combined Weight:',comb_weight_skill
    print sorted(comb_weight_skill, key=lambda x: x[1],reverse=True)
    #print comb_weight_skill.sort(key=operator.itemgetter(1))
    with open("new_skills.csv", "w") as f:
        writer = csv.writer(f,delimiter=',')
        writer.writerow(list_1)

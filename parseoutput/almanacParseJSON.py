# -*- coding: utf-8 -*-
# This script reads in a .lis file generated through the AP3270/NP303 publication process
# and converts the tabular data to an sqlite db for use in the prototype AP3270/NP303 app
#
# This code is for the 2020.0 Epoch

#Import regular expression library and sqlite3
import re
#import sqlite3
#print (sqlite3.sqlite_version)

almc = open('websurf17939_almanac.txt','r')

# Initialise arrays that can be appended
object = []# Object
ra_hour = []
ra_min = []
ra_sec = []
dec_deg = []
dec_min = []
dec_sec = []
az_deg = []
az_min = []
alt_deg = []
alt_min = []
constellation = []
distance = []
semi_diam = []
magnitude = []
elongation_deg = []
elongation_sign = []
visibility = []

def parse_dec_alt(data):
    object.append(data[0])
    ra_hour.append(data[1])
    ra_min.append(data[2])
    ra_sec.append(data[3])
    dec_deg.append(data[4]+data[5])
    dec_min.append(data[6])        
    dec_sec.append(data[7])
    az_deg.append(data[8])
    az_min.append(data[9])
    alt_deg.append(data[10]+data[11])
    alt_min.append(data[12])        
    constellation.append(data[13])
    distance.append(data[14])
    semi_diam.append(data[15])
#    magnitude.append(data[16])
#    elongation_deg.append(data[17])
#    elongation_sign.append(data[18])
    if data[0] == "Sun":
        magnitude.append("N/A")
        elongation_deg.append("N/A")
        elongation_sign.append("N/A")
        i=17;
        vis = ""
        while i<len(data):
           vis = vis + data[i] + " "
           i = i + 1
        visibility.append(vis)   
    else:    
        magnitude.append(data[16])
        elongation_deg.append(data[17])
        elongation_sign.append(data[18])
        i=19;
        vis = ""
        while i<len(data):
           vis = vis + data[i] + " "
           i = i + 1
        visibility.append(vis)   

def parse_dec_only(data):
    object.append(data[0])
    ra_hour.append(data[1])
    ra_min.append(data[2])
    ra_sec.append(data[3])
    dec_deg.append(data[4]+data[5])
    dec_min.append(data[6])        
    dec_sec.append(data[7])
    az_deg.append(data[8])
    az_min.append(data[9])
    alt_deg.append(data[10])
    alt_min.append(data[11])        
    constellation.append(data[12])
    distance.append(data[13])
    semi_diam.append(data[14])
#    magnitude.append(data[15])
#    elongation_deg.append(data[16])
#    elongation_sign.append(data[17])
    if data[0] == "Sun":
        magnitude.append("N/A")
        elongation_deg.append("N/A")
        elongation_sign.append("N/A")
        i=16;
        vis = ""
        while i<len(data):
           vis = vis + data[i] + " "
           i = i + 1
        visibility.append(vis)   
    else:    
        magnitude.append(data[15])
        elongation_deg.append(data[16])
        elongation_sign.append(data[17])
        i=18;
        vis = ""
        while i<len(data):
           vis = vis + data[i] + " "
           i = i + 1
        visibility.append(vis)   
            
def parse_alt_only(data):
    object.append(data[0])
    ra_hour.append(data[1])
    ra_min.append(data[2])
    ra_sec.append(data[3])
    dec_deg.append(data[4])
    dec_min.append(data[5])        
    dec_sec.append(data[6])
    az_deg.append(data[7])
    az_min.append(data[8])
    alt_deg.append(data[9]+data[10])
    alt_min.append(data[11])        
    constellation.append(data[12])
    distance.append(data[13])
    semi_diam.append(data[14])
#    magnitude.append(data[15])
#    elongation_deg.append(data[16])
#    elongation_sign.append(data[17])
    if data[0] == "Sun":
        magnitude.append("N/A")
        elongation_deg.append("N/A")
        elongation_sign.append("N/A")
        i=16;
        vis = ""
        while i<len(data):
           vis = vis + data[i] + " "
           i = i + 1
        visibility.append(vis)   
    else:    
        magnitude.append(data[15])
        elongation_deg.append(data[16])
        elongation_sign.append(data[17])
        i=18;
        vis = ""
        while i<len(data):
           vis = vis + data[i] + " "
           i = i + 1
        visibility.append(vis)   
            
def parse_dec_nor_alt(data):
    object.append(data[0])
    ra_hour.append(data[1])
    ra_min.append(data[2])
    ra_sec.append(data[3])
    dec_deg.append(data[4])
    dec_min.append(data[5])        
    dec_sec.append(data[6])
    az_deg.append(data[7])
    az_min.append(data[8])
    alt_deg.append(data[9])            
    alt_min.append(data[10])        
    constellation.append(data[11])
    distance.append(data[12])
    semi_diam.append(data[13])
    if data[0] == "Sun":
        magnitude.append("N/A")
        elongation_deg.append("N/A")
        elongation_sign.append("N/A")
        i=15;
        vis = ""
        while i<len(data):
           vis = vis + data[i] + " "
           i = i + 1
        visibility.append(vis)   
    else:    
        magnitude.append(data[14])
        elongation_deg.append(data[15])
        elongation_sign.append(data[16])
        i=17;
        vis = ""
        while i<len(data):
           vis = vis + data[i] + " "
           i = i + 1
        visibility.append(vis)   

    
# Read in data and *split* appropriately
for i, line in enumerate(almc):

    #Read column labels line 15
    if i == 14:
        print(re.split(" +",line))
    # Read first data line
#    elif i == 17:
        #print(re.match('Mer',line))
#        print(re.split(" +",line))
#    elif i == 18:
#        obj = re.split(" +",line)
#        print(obj)
    elif i in (17,18,19,20,21,22,23,24,25,30):
        obj = re.split(" +",line)
        #print(obj)
        # if dec has single figure degree
        if obj[4] in ("+", "-") and obj[10] in ("+", "-"):
           print("dec and alt single",len(obj))
           parse_dec_alt(obj)
        elif obj[4] in ("+", "-") and obj[10] not in ("+", "-"):
           print("only dec single",len(obj))
           parse_dec_only(obj)           
        elif obj[4] not in ("+", "-") and obj[9] in ("+", "-"):
           print("only alt single",len(obj))
           parse_alt_only(obj)           
        else:
           print("neither single",len(obj))
           parse_dec_nor_alt(obj)           
    elif i == 30:
        break
			
#print (len(lat))
print (object[0],object[9])		
print (len(object))
c = 0
while c<len(elongation_deg):
    print(elongation_deg[c],elongation_sign[c])
    c=c+1
#print (elongation_deg[0],elongation_deg[4],elongation_deg[9])
c=0
while c<len(visibility):
    print ("visibility is: ",visibility[c])
    c=c+1

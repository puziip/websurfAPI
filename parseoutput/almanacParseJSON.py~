# -*- coding: utf-8 -*-
# This script reads in a .lis file generated through the AP3270/NP303 publication process
# and converts the tabular data to an sqlite db for use in the prototype AP3270/NP303 app
#
# This code is for the 2020.0 Epoch

#Import regular expression library and sqlite3
import re
import sqlite3
print (sqlite3.sqlite_version)

hczn = open('hczn20.lis','r')

lat = [] 		# 2 digit int
latSign = [] 	        # single character or +/-?
LHA = [] 		# three digit int	
Object = []		# String char seq
hcDeg = []		# 2 digit int
hcMin = []		# 2 digit int
zn = []			# 3 digit int

# The seven best stars are listed with an asterisk at the beginning
# First magnitude stars have their names capitalised
sevenBest = []	# 0 or 1, 1 digit int
firstMag = []	# 0 or 1, 1 digit int
 
counter = 0
countD = 0
countZ = 0

# Read in data and *split* appropriately
for line in hczn:

	#do nothing with blank lines
	if not line.strip():	
	    continue		
	
	#collect latitude in array
	elif 'Latitude' in line:

                # Split with blank space creates 3 objects in array
                # e.g. 'Latitude' '89' and 'N'
		lt = re.split(" +",line)
		lat.append(lt[1])
		latSign.append(lt[2].strip())

	#search for objects using asterisk
	#and populate array with object names
	elif '*' in line:
#       This is a regex line that can also be used
#	elif re.search('[A-Z|a-z|*|\s+]',line):

                obj = line.split(",")
                Object.append(obj)
        #search for lines that have a number/digit
        #for searching from the beginning of the line use re.match
	elif re.search('\d+',line):

                lhahczn = line.split()
                LHAArr = [ lhahczn[0],lhahczn[0],lhahczn[0],lhahczn[0],lhahczn[0],lhahczn[0],lhahczn[0] ]
                LHA.append(LHAArr)

                hcDegArr = [ lhahczn[1],lhahczn[4],lhahczn[7],lhahczn[10],lhahczn[13],lhahczn[16],lhahczn[19] ]
                hcMinArr = [ lhahczn[2],lhahczn[5],lhahczn[8],lhahczn[11],lhahczn[14],lhahczn[17],lhahczn[20] ]
                znArr = [ lhahczn[3],lhahczn[6],lhahczn[9],lhahczn[12],lhahczn[15],lhahczn[18],lhahczn[21] ]
		
                hcDeg.append(hcDegArr)
                hcMin.append(hcMinArr)
                zn.append(znArr)
		
print (len(lat))
print (latSign[0],latSign[1])		
print (len(Object))
print (Object[3815][6])

print (len(LHA))
print (LHA[2])
print (len(hcDeg))
print (hcDeg[57239][4])
print (len(hcMin))
print (len(zn))


# The next loop manipulates the data in a form that we require for the sqlite3 db
# Same name arrays but with an F to distinguish

latF = [] 		# 2 digit int
latSignF = [] 	        # single character or +/-?
LHAF = [] 		# three digit int	
ObjectF = []		# String char seq
hcDegF = []		# 2 digit int
hcMinF = []		# 2 digit int
znF = []		# 3 digit int

# Assigned length arrays for flags
sevenBestF = [0] * 400680 # or 1, 1 digit int
firstMagF = [0] * 400680	# 0 or 1, 1 digit int

# counters
m = 0
j = 0
fif = 0
obj = 0

for i in range(0,len(lat)):

    obj = 0
    while obj<12:
            
        fif = 0    
        while fif<15:
            
            for k in range(0,7):

                latF.append(lat[i])
                latSignF.append(latSign[i])
        
                ObjectF.append(Object[j][k])

                LHAF.append(LHA[m][k])
                hcDegF.append(hcDeg[m][k])
                hcMinF.append(hcMin[m][k])
                znF.append(zn[m][k])

                #print(d)

            fif = fif + 1
            m = m + 1

        obj = obj + 1
        j = j + 1

print(m,j,obj,fif)

print("x")

print (len(latF))
print (len(latSignF))		
print (type(ObjectF))
print (len(LHAF))
print (len(hcDegF))

print (LHAF[400670])
print (ObjectF[400677])
print (hcDegF[400679])
print (len(hcMinF))
print (len(znF))

## Code to generate extra 2 columns for flags

for n in range(len(ObjectF)):

    # strip() removes blank spaces at the start and end of each string
    # this does not work on lists
    strpName = ObjectF[n].strip()
    strpName = re.sub('[\*|\\\\]', '', strpName)
    strpName = strpName.strip()
    #print (strpName)

    #any string with an asterisk should be flagged as one of the seven best
    if '*' in ObjectF[n]:
        sevenBestF[n] = 1
    #any string with all capitals is a first magnitude star
    if strpName.isupper():
        firstMagF[n] = 1

    #Once we have the flags we do not need the back slash or asterisk indicators
    #for first mag and seven best stars in object name
    ObjectF[n] = strpName


# Adjust RIGIL KENT name
ObjectF = [w.replace('RIGILKENT', 'RIGIL KENT') for w in ObjectF ]

print (ObjectF[400677])
ind = 400670
print (latF[ind],latSignF[ind],LHAF[ind],ObjectF[ind],hcDegF[ind],hcMinF[ind],znF[ind],sevenBestF[ind],firstMagF[ind])
#print (sevenBestF[400678])
#print (firstMagF[400678])


""" CREATE SQLITE DB FOR AP3270 ALL SEXT ALT AND AZIMUTH DATA """

#Connect to db
dbHCZ = sqlite3.connect('hczn.db')
#create cursor object
dbHCZN = dbHCZ.cursor()

#drop table if it already exists
dbHCZN.execute('drop table rsrtHCZN')

#uncommneted as only need if creating table for first time
dbHCZN.execute('''CREATE TABLE rsrtHCZN
                  (LAT     integer,
                  LATSIGN text,
                  OBJECT  text,
                  LHA     integer,
                  HCDEG   integer,
                  HCMIN   integer,
                  ZN      integer,
                  SEVENBEST integer,
                  FIRSTMAG integer)''')

for i in range(len(LHAF)):


        # To add a asterisk to the object name to conform to the same naming convention as the publication
        if (sevenBestF[i] == 1):    
            dbHCZN.execute("INSERT INTO rsrtHCZN VALUES (?,?,?,?,?,?,?,?,?)",(latF[i],
                                                                  latSignF[i],
                                                                  ObjectF[i]+"*",
                                                                  LHAF[i],
                                                                  hcDegF[i],
                                                                  hcMinF[i],
                                                                  znF[i],
                                                                  sevenBestF[i],
                                                                  firstMagF[i]))
        else:
        
            #dbStruc.append(eDateTimeStr[i] eventYear[i],eventMonth[i],eventDay[i],eventTime[i],eventObj[i],eventDesc[i])
            dbHCZN.execute("INSERT INTO rsrtHCZN VALUES (?,?,?,?,?,?,?,?,?)",(latF[i],
                                                                  latSignF[i],
                                                                  ObjectF[i],
                                                                  LHAF[i],
                                                                  hcDegF[i],
                                                                  hcMinF[i],
                                                                  znF[i],
                                                                  sevenBestF[i],
                                                                  firstMagF[i]))

#Save (commit) the changes
dbHCZ.commit()
 
# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
dbHCZ.close()

""" CREATE SQLITE DB FOR AP3270 BASIC DATA LAT 0 and 1 N and S """

#Connect to db
dbHCZ = sqlite3.connect('hcznLat1N01S.db')
#create cursor object
dbHCZN = dbHCZ.cursor()

#drop table if it already exists
dbHCZN.execute('drop table rsrtHCZNLat1N01S')

#uncommneted as only need if creating table for first time
dbHCZN.execute('''CREATE TABLE rsrtHCZNLat1N01S
                  (LAT     integer,
                  LATSIGN text,
                  OBJECT  text,
                  LHA     integer,
                  HCDEG   integer,
                  HCMIN   integer,
                  ZN      integer,
                  SEVENBEST integer,
                  FIRSTMAG integer)''')

for i in range(len(LHAF)):

    if latF[i] in ('0','1','24'):

        # To add a asterisk to the object name to conform to the same naming convention as the publication            
        if (sevenBestF[i] == 1):    
            dbHCZN.execute("INSERT INTO rsrtHCZNLat1N01S VALUES (?,?,?,?,?,?,?,?,?)",(latF[i],
                                                                  latSignF[i],
                                                                  ObjectF[i]+"*",
                                                                  LHAF[i],
                                                                  hcDegF[i],
                                                                  hcMinF[i],
                                                                  znF[i],
                                                                  sevenBestF[i],
                                                                  firstMagF[i]))
        else:
            dbHCZN.execute("INSERT INTO rsrtHCZNLat1N01S VALUES (?,?,?,?,?,?,?,?,?)",(latF[i],
                                                                  latSignF[i],
                                                                  ObjectF[i],
                                                                  LHAF[i],
                                                                  hcDegF[i],
                                                                  hcMinF[i],
                                                                  znF[i],
                                                                  sevenBestF[i],
                                                                  firstMagF[i]))

#Save (commit) the changes
dbHCZ.commit()
 
# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
dbHCZ.close()

""" CREATE SQLITE DB FOR AP3270 MOO EXAMPLE FOR FIRST SHOWING OF THE RYA - LAT 24 15' N """

#Connect to db
#dbHCZ = sqlite3.connect('hcznLAT24N.db')
#create cursor object
#dbHCZN = dbHCZ.cursor()

#drop table if it already exists
#dbHCZN.execute('drop table rsrtHCZNLAT24N')

#uncommneted as only need if creating table for first time
#dbHCZN.execute('''CREATE TABLE rsrtHCZNLAT24N
#                  (LAT     integer,
#                  LATSIGN text,
#                  OBJECT  text,
#                  LHA     integer,
#                  HCDEG   integer,
#                  HCMIN   integer,
#                  ZN      integer,
#                  SEVENBEST integer,
#                  FIRSTMAG integer)''')
#
#for i in range(len(LHAF)):
#
#    if (latF[i] == ("24") and latSignF[i] in ("N")):
#
#        # To add a asterisk to the object name to conform to the same naming convention as the publication            
#        if (sevenBestF[i] == 1):    
#            dbHCZN.execute("INSERT INTO rsrtHCZNLAT24N VALUES (?,?,?,?,?,?,?,?,?)",(latF[i],
#                                                                  latSignF[i],
#                                                                  ObjectF[i]+"*",
#                                                                  LHAF[i],
#                                                                  hcDegF[i],
#                                                                  hcMinF[i],
#                                                                  znF[i],
#                                                                  sevenBestF[i],
#                                                                  firstMagF[i]))
#        else:
#            dbHCZN.execute("INSERT INTO rsrtHCZNLAT24N VALUES (?,?,?,?,?,?,?,?,?)",(latF[i],
#                                                                  latSignF[i],
#                                                                  ObjectF[i],
#                                                                  LHAF[i],
#                                                                  hcDegF[i],
#                                                                  hcMinF[i],
#                                                                  znF[i],
#                                                                  sevenBestF[i],
#                                                                  firstMagF[i]))

#Save (commit) the changes
#dbHCZ.commit()
 
# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
#dbHCZ.close()

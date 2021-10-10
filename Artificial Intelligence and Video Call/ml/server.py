from keras.models import load_model
import json
import numpy as np
import pandas as pd
import sys

def loadJSON(jsonFile):
    with open(jsonFile, 'r') as fp:
        data = json.load(fp)
    return data

tag2idx = loadJSON("./ml/tag2idx.json")
word2idx = loadJSON("./ml/word2idx.json")
inverted_dict = loadJSON("./ml/inverted_dict.json")
model = load_model("./ml/my_model")

def getDict(ans,samples):
  prescription = {}
  name = ""
  age = None
  gender = None
  disease = ""
  symptom_duration = None
  symptoms = {}
  advise = {}
  num_medic = 0
  num_du = 0
  num_dof = 0
  num_do = 0
  symp_start = ""
  adv_start = ""
  medi = []
  du = []
  do = []
  dof = []  
  medi_start = ""
  du_start = ""
  dof_start = ""
  do_start = ""

  for i in range(len(ans)):
    if ans[i] == "B-NA":
      name = samples.split()[i]
    elif ans[i] == "I-NA":
      name = name + " " + samples.split()[i]

    if ans[i] == "B-DI":
      disease = samples.split()[i]
    elif ans[i] == "I-DI":
      disease += " " + samples.split()[i]


    if ans[i] == "B-SYDU":
      symptom_duration = samples.split()[i]
    elif ans[i] == "I-SYDU":
      symptom_duration += " " + samples.split()[i]


    if ans[i] == "B-AG":
      age = samples.split()[i]
    if ans[i] == "B-GE":
      gender = samples.split()[i]

    if ans[i] == "B-ME":
      num_medic += 1
    if ans[i] == "B-DO":
      num_do += 1
    if ans[i] == "B-DU":
      num_du += 1
    if ans[i] == "B-DOF":
      num_dof += 1

    if ans[i] == "B-SY" and ans[i+1] == "I-SY":
      symp_start += samples.split()[i]
    elif ans[i] == "B-SY" and ans[i+1] != "I-SY":
      symptoms[samples.split()[i]] = True
    elif ans[i] == "I-SY" and ans[i+1] == "I-SY":
      symp_start += " " + samples.split()[i]
    elif ans[i] == "I-SY" and ans[i+1] != "I-SY":
      symp_start += " " + samples.split()[i]
      symptoms[symp_start] = True
      symp_start = ""

    if ans[i] == "B-AD" and ans[i+1] == "I-AD":
      adv_start += samples.split()[i]
    elif ans[i] == "B-AD" and ans[i+1] != "I-AD":
      advise[samples.split()[i]] = True
    elif ans[i] == "I-AD" and ans[i+1] == "I-AD":
      adv_start += " " + samples.split()[i]
    elif ans[i] == "I-AD" and ans[i+1] != "I-AD":
      adv_start += " " + samples.split()[i]
      advise[adv_start] = True
      adv_start = ""

    if ans[i] == "B-ME" and ans[i+1] == "I-ME":
      medi_start += samples.split()[i]
    elif ans[i] == "B-ME" and ans[i+1] != "I-ME":
      medi.append(samples.split()[i])
    elif ans[i] == "I-ME" and ans[i+1] == "I-ME":
      medi_start += " " + samples.split()[i]
    elif ans[i] == "I-ME" and ans[i+1] != "I-ME":
      medi_start += " " + samples.split()[i]
      medi.append(medi_start)
      medi_start = ""

    
    if ans[i] == "B-DU" and ans[i+1] == "I-DU":
      du_start += samples.split()[i]
    elif ans[i] == "B-DU" and ans[i+1] != "I-DU":
      du.append(samples.split()[i])
    elif ans[i] == "I-DU" and ans[i+1] == "I-DU":
      du_start += " " + samples.split()[i]
    elif ans[i] == "I-DU" and ans[i+1] != "I-DU":
      du_start += " " + samples.split()[i]
      du.append(du_start)
      du_start = ""

    if ans[i] == "B-DOF" and ans[i+1] == "I-DOF":
      dof_start += samples.split()[i]
    elif ans[i] == "B-DOF" and ans[i+1] != "I-DOF":
      dof.append(samples.split()[i])
    elif ans[i] == "I-DOF" and ans[i+1] == "I-DOF":
      dof_start += " " + samples.split()[i]
    elif ans[i] == "I-DOF" and ans[i+1] != "I-DOF":
      dof_start += " " + samples.split()[i]
      dof.append(dof_start)
      dof_start = ""

    if ans[i] == "B-DO" and ans[i+1] == "I-DO":
      do_start += samples.split()[i]
    elif ans[i] == "B-DO" and ans[i+1] != "I-DO":
      do.append(samples.split()[i])
    elif ans[i] == "I-DO" and ans[i+1] == "I-DO":
      do_start += " " + samples.split()[i]
    elif ans[i] == "I-DO" and ans[i+1] != "I-DO":
      do_start += " " + samples.split()[i]
      do.append(do_start)
      do_start = ""


  if gender == None:
    if "He" in samples.split() or "he" in samples.split():
      gender = "male"
    elif "She" in samples.split() or "she" in samples.split():
      gender = "female"
 

  prescription["name"] = name
  prescription["age"] = age
  prescription["gender"] = gender
  prescription["symptoms"] = symptoms
  prescription["disease"] = disease
  prescription["advise"] = advise
  prescription["symptom_duration"] = symptom_duration

  prescription["medication"] = {}
  for m in medi:
    prescription["medication"][m] = {}

  if num_medic == num_dof:
    for i in range(num_medic):
      prescription["medication"][medi[i]]["dosage_frequency"] = dof[i]
  elif num_medic != num_dof and num_dof!=0:
    for i in range(num_medic):
      prescription["medication"][medi[i]]["dosage_frequency"] = dof[0]

  if num_medic == num_du:
    for i in range(num_medic):
      prescription["medication"][medi[i]]["duration"] = du[i]
  elif num_medic != num_du and len(du)!=0:
    for i in range(num_medic):
      prescription["medication"][medi[i]]["duration"] = du[0]

  helper = {}
  if num_medic == num_do:
    for i in range(num_medic):
      prescription["medication"][medi[i]]["dosage"] = do[i]
  else:
    for i in range(len(ans)):
      if ans[i]=='B-DO':
        for j in range(i-3,i+3):
          if ans[j]=='B-ME':
            helper[samples.split()[i]] = j

    for i in range(len(do)):
      for j in range(len(medi)):
        if helper.get(do[i].split()[0]) and samples.split()[helper[do[i].split()[0]]] in medi[j]:
          prescription["medication"][medi[j]]["dosage"] = do[i]
  return prescription
  
def convertDict(nd):
    i = 1
    symp = {}
    adv = {}
    med = {}
    for sy in nd.get('symptoms').keys():
        symp['Symptom ' + str(i)] = sy
        i += 1
    i = 1
    for ad in nd.get('advise').keys():
        adv['Advice ' + str(i)] = ad
        i += 1
    i = 1
    for md in nd.get('medication').keys():
        med['Medication ' + str(i)] = {
            md: nd.get('medication').get(md)
        }
        i += 1
        
    return {
        "name": {"name": nd.get('name')},
        "age": {"age": nd.get('age')},
        "gender": {"gender": nd.get('gender')},
        "symptoms": symp,
        "disease": {"disease": nd.get('disease')},
        "advice": adv,
        "medication": med
    }

import speech_recognition as sr
import pyaudio

r = sr.Recognizer()


import urllib
# import json
def download_file(my_url):
    # my_url = "https://firebasestorage.googleapis.com/v0/b/fir-189ce.appspot.com/o/media.io_WhatsApp%20Audio%202020-01-03%20at%203.53.36%20PM.wav?alt=media&token=ee94b151-0014-4c30-9601-8b3208cf4b87"
    try:
        loader = urllib.request.urlretrieve(my_url, "./ml/prescription.wav")
        return loader
    except urllib.error.URLError as e:
        message = json.loads(e.read())
        print(message["error"]["message"])
    else:
        print(loader)

tags = []
with open("./ml/tags.txt") as f:
    for ff in f.readlines():
        tags.append(ff[:-1])

# print(tags)

nd = {}

def extract(urlLink):
    # if refFile.get()['URL']:
        # d = refFile.get()
        # urlLink = d['URL']
    download_file(urlLink)
    with sr.AudioFile("./ml/prescription.wav") as source:
      audio = r.listen(source)
    text = r.recognize_google(audio)
    # print(text)

    # text = "The patients name is yogesh he is 22 years old gender is male Symptoms shown are loss of appetite You are suffering from breast cancer Take 200mg Acetaminophen twice a day for 2 days Take complete bed rest"
    s = ""
    # print(text)
    spl = text.split()
    c = len(spl)
    spl2 = []
    for i in range(c):
#             print(len(spl2),len(spl),sep = " ")
        if spl[i] == "mg" or spl[i] == "ml":
            spl2[len(spl2)-1] += spl[i]
        elif spl[i] == "MG" or spl[i] == "ML":
            spl2[len(spl2)-1] += spl[i].lower()
        else:
            spl2.append(spl[i])
    text = spl2
    for a in text:
      if word2idx.get(a):
        if s == "":
          s += a 
        else:
          s += " " + a 
    # print(s)
    lis = [x for x in s.split()]
    for i in range(len(s.split()),90):
      lis.append('ENDPAD')
#         print(lis)
    test = [word2idx[w] for w in lis]
    p = model.predict(np.array([test]))
    p = np.argmax(p, axis=-1)
    ans = [tags[x] for x in p[0]]
    # for x,y in zip(lis,ans):
    #     print(x + " - " + y,end="\n")
    # print(ans)
    # d['URL'] = False
    # refFile.set(d)
    
    dp = getDict(ans,s)
    nd = dp
    return convertDict(dp)
        # refpython.set({'isAvailable':convertDict(dp)})
    # pass

fileName = sys.argv[1]
# print(extract("./Mobinurse/recorded_audio.wav"))
print(json.dumps(extract(fileName)))
# print(extract())

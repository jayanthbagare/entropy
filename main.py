#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pandas as pd
import itertools
import numpy as np

testID = ['T1','T2','T3','T4','T5']
userID = ['U1','U2','U3','U4','U5']
questionID = ['Q1','Q2','Q3','Q4','Q5']

lists = [testID,userID,questionID]
combinations = [p for p in itertools.product(*lists)]

df = pd.DataFrame(columns=['TestID','UserID','QuestionID','Correct'])

for item in combinations:
    rnd = np.random.random()
    if(rnd > 0.4):
        c = 1 # Means answered Correct
    else:
        c = 0 # Means answered wrong
    #  df = df.append({'TestID':item[0],'UserID':item[1],'QuestionID':item[2],'Correct':c},ignore_index=True)
    df.loc[len(df)] = [item[0],item[1],item[2],c]

df.to_csv('entropy.csv')

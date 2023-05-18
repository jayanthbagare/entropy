/**
 * 
 * @param {*} QuestionID 
 * @returns entropy
 * The function takes in a question ID and based on how the question has been answered
 * the entropy is calculated
 * H(entropy) = -1 * sum(p(x)+log2(p(x)))
 * Reference from : https://towardsdatascience.com/entropy-and-information-gain-in-decision-trees-c7db67a3a293
 */

function calculate_entropy(QuestionID){
  const dfd = require("danfojs-node");
  let qid = QuestionID;
  var out_entropy = 0.0;
  out_entropy = dfd.readCSV('entropy.csv')
    .then(df=>{
            let correct_df = df.query(df["QuestionID"].eq(qid).and(df["Correct"].eq(1)));
            let wrong_df = df.query(df["QuestionID"].eq(qid).and(df["Correct"].eq(1)));
            let all = df.count({axis:0}).$data[0];
            let success = correct_df.count({axis:0}).$data[0];
            let fail = wrong_df.count({axis:0}).$data[0];
            let success_term = success/all * Math.log2(success/all);
            let wrong_term = success/all * Math.log2(success/all);
            let entropy = -1 * (success_term + wrong_term);
            return entropy;
        });
  return out_entropy;
}

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  calculate_entropy('Q1').then(function(result){
    res.json({"entropy":result});
  });
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
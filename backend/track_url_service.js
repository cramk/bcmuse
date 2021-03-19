const puppeteer = require("puppeteer");
const fs = require("fs");
const fetch = require("fetch");
const validateURL = require("./validate_url");
const resp_endpoint = require("./resp_endpoint");
let outVal = {};
let run_service = (valIn, outVal) => {
  return (async (val, outValObj) => {
    let outObj = {};
 
    const useURL = val;
    if (!validateURL(useURL)) {
      return false;
    }
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
    try {
      let dlPage = await browser.newPage();
 

      await dlPage.goto(useURL, { waitUntil: "networkidle2" });

      await dlPage.waitForSelector(".trackTitle");

      let titleText = await dlPage.evaluate(
        () => document.querySelector(`.trackTitle`)?.innerText ?? false
      );

   
      function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, "g"), replace);
      }
      titleText = replaceAll(titleText, " ", "_");
      titleText = replaceAll(titleText, "'", "");
      titleText = replaceAll(titleText, '"', "");
      titleText = replaceAll(titleText, "\t", "-");
      titleText = replaceAll(titleText, "\r", "-");
      titleText = replaceAll(titleText, "\n", "-");
      titleText = replaceAll(titleText, ",", "-");
      titleText = replaceAll(titleText, "&", "-");
      titleText = replaceAll(titleText, ":", "-");
        
      titleText = titleText.split("*").join("-");
      titleText = titleText.split("/").join("-");
      titleText = titleText.split("?").join("-");
      titleText = titleText.split(".").join("-");
      titleText = titleText.split("%").join("-");
      titleText = titleText.split("\\").join("-");

      await dlPage.waitForSelector("td.play_cell > a");

      let pageclick = dlPage.click("td.play_cell > a");

      let resp = dlPage.waitForResponse((response) => {
        if (response.url().indexOf(resp_endpoint) > -1) {
          respStr = response.url();

          let obj = { url: response.url(), title: titleText };
   
          outObj = obj;
          console.log("DL Obj", outObj);

          return true;
        } else {
          return false;
        }
      });

      await Promise.all([pageclick, resp]);

      await browser.close();
      return outObj;
    } catch (e) {
      await browser.close();
      throw e;
    }
  })(valIn, outVal);
};

module.exports = run_service;

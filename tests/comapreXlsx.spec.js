// @ts-check
const { test, expect } = require('@playwright/test');
const Excel = require('exceljs');
const { comapreExcel } = require('../utilities/comparexlsx');
const expectedPath = 'resources/expected.xlsx';
const actualPath = 'resources/actual.xlsx';

test('has title', async ({ context }, testInfo) => {
  // login with api -> JWT, SMSESSIONID -> store addcookies

  // axios login api call
  // const resp = await axios.post('baseurl', {})

  // const a = {jwt:'asd',
  //            smsessionId:'12121'}
  // await context.addCookies([{ name: 'jwt', value: 'asx' }, { name: 'smsessionId', value: '123' }])
  // const page = await context.newPage()
  // await page.goto('https://www.google.ca/')

  // login with browser -> browser will automatically store jwt and smsessionId as a cookies in cookies
  // const page = await context.newPage()
  // await page.goto('https://www.google.com/')
  //login
  // await page.context().storageState({ path: 'pw/admin.json' });

  // const context = await browser.newPage({ storageState: 'pw/admin.json' });
  // const a = { name: 'jaimin' }
  // expect(a).toBe(3)


  // const excel = fs.realpathSync(path, { encoding: 'utf8' });
  // console.log(testInfo.titlePath[0])
  comapreExcel(expectedPath, actualPath, { ignoreBgColor: true });
  // const wb = new Excel.Workbook();
  // await Promise.all([wb.xlsx.readFile(path)])

  // const sheet = wb.eachSheet((item) => {
  //   const sheetName = item.name;
  //   console.log(sheetName)
  // });

});

// test.describe.serial('two tests', () => {
//   test('one', async ({ page }) => {
//     // ...check admin
//     await page.goto('https://www.google.ca/')
//     await expect(page).toHaveTitle('jaimin')
//   });

//   test('two', async ({ page }) => {
//     // ... check admin 2
//     await page.goto('https://www.google.ca/')


//   });
// });
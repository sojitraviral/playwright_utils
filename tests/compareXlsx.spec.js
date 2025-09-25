// @ts-check
const { test, selectors } = require('@playwright/test');
const Excel = require('exceljs');
const { comapreExcel } = require('../utilities/comparexlsx');
const { DashboardPage } = require('../pageObjects');
const expectedPath = 'resources/expected.xlsx';
const actualPath = 'resources/actual.xlsx';
test.beforeEach(async ({ }) => {
  selectors.setTestIdAttribute('data-testid')
})

test.only('has title', async ({ context, page }, testInfo) => {

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
  // console.log(process.env.ENV)
  // comapreExcel(expectedPath, actualPath, { ignoreBgColor: true });
  // const wb = new Excel.Workbook();
  // await Promise.all([wb.xlsx.readFile(path)])

  // const sheet = wb.eachSheet((item) => {
  //   const sheetName = item.name;
  //   console.log(sheetName)
  // });
  const dashboardPage = new DashboardPage()
  await page.goto('https://github.com/');

  await page.getByPlaceholder("Search or jump to...").click();
  await page.locator("#query-builder-test").fill("playwright");
  await page.keyboard.press('Enter')

  await page.getByTestId('results-list').getByRole("link", { name: "microsoft/playwright" }).first().click()
  // await page.getByRole("link", { name: "microsoft/playwright" }).first().click()
  await page.getByRole("button", { name: "Code" }).click()
  await page.locator("[data-component='IconButton']").last().click()
  const repoUrl = await page.evaluate("navigator.clipboard.readText()");
  // const repoUrl = await page.locator("#clone-with-https").getAttribute("value")
  console.log("url", repoUrl)
  await page.pause()

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
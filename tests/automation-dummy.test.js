// Needs to be higher than the default Playwright timeout
jest.setTimeout(600 * 1000);

const { Eyes, ClassicRunner, Target, RectangleSize} = require('@applitools/eyes-playwright');

  afterAll(async () => {
    await page.close();
    await browser.close();
  });


  beforeAll(async () => {
    //const page = await browser.newPage();
    await page.setViewportSize({
      width:1440,
      height: 9000
    });
    await page.goto("https://automation-dummy.vercel.app/");
  });

describe("Landing Page Validation", () => {
    
  it("Verify loader", async () => {
    page.setDefaultTimeout(45000);
    const loader = await page.$$(".loader.loader--show");
    expect(loader.length>0).toBeTruthy();

  });

  it("Change CyberFuse to SourceFuse", async () => {
    const loader1 = await page.$$(".loader");
    expect(loader1.length>0).toBeTruthy();
  })

  it("should be able to navigate to automation-dummy page and validate loader", async () => {
    await page.fill("#center-text","<SourceFuse/>");
  })
  //
  it("Test Case 3: Rotate Camera clockwise, take a screenshot and store the image.", async () => {
    await page.mouse.move(600, 400);
    await page.mouse.down();
    await page.mouse.move(200, 400);
    await page.mouse.up();
    await page.click("#take-screenshot");
    await page.screenshot({path: `1.png`});
  })

  it("Test Case 4: Turn on Bump and Light, reset position, take a screenshot and store the image.", async () => {
    await page.click('input[type=checkbox][name=bump]');
    await page.screenshot({path: `2.png`});
    await page.click("#take-screenshot");

    await page.click('input[type=checkbox][name=lighting]');
    await page.screenshot({path: `3.png`});
    await page.click("#take-screenshot");
  })


  xit("Test Case 5: Visual Regression(BONUS) - Verify and assert the changes to canvas and screenshots.", async () => {
    const eyes = new Eyes(new ClassicRunner());
    eyes.setApiKey('V3n1pdpp0NqG613LtwxBmv4UFM9EP3QHjiuvJs4wVlM110');
    await page.click('#reset');
    const el = await page.$('#renderCanvas');
    await eyes.open(page, "automation-dummy", "automation-dummy");
    await eyes.check(Target.region(el));
    await eyes.close();  
  })


})
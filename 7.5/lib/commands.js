module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  clickElements: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  isButtonEnabled: async function (page, buttonSelector, attributeName) {
    const isDisabled = await page.$eval(
      buttonSelector,
      (element, attr) => {
        return element.getAttribute(attr) !== null;
      },
      attributeName
    );
    return isDisabled;
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
};

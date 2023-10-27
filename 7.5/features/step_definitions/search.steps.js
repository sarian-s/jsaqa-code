const puppeteer = require("puppeteer");
const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, isButtonEnabled } = require("../../lib/commands.js");

Before(async function () {
  this.browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  this.page = await this.browser.newPage();
  await this.page.setDefaultNavigationTimeout(0);
  await this.page.goto("http://qamid.tmweb.ru/client/index.php");
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

// Сценарий 1: Бронирование одного билета
Given("user is on the booking page", async function () {});

When("user chooses a ticket", async function () {
  await clickElement(this.page, "body > nav > a:nth-child(2)");
  await clickElement(
    this.page,
    "body > main > section:nth-child(3) > div:nth-child(2) > ul > li > a"
  );
  await this.page.waitForSelector(
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper"
  );
  await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(1)"
  );
});

Then(
  "the booking button for single ticket should be enabled",
  async function () {
    const isButtonActive = await isButtonEnabled(
      this.page,
      "body > main > section > button",
      "disabled"
    );
    expect(isButtonActive).to.be.false;
  }
);

// Сценарий 2: Бронирование нескольких билетов
When("user chooses a few tickets", async function () {
  await clickElement(this.page, "body > nav > a:nth-child(7)");
  await clickElement(
    this.page,
    "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a"
  );
  await this.page.waitForSelector(
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper"
  );

  await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(10)",
    { timeOut: 10000 }
  );
  await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(10)",
    { timeOut: 10000 }
  );
});

Then("the booking button should be enabled", async function () {
  const isButtonActive = await isButtonEnabled(
    this.page,
    "body > main > section > button",
    "disabled"
  );
  expect(isButtonActive).to.be.false;
});

//  Сценарий 3: Попытка забронировать уже забронированный билет
When("user chooses a booked ticket", async function () {
  await clickElement(this.page, "body > nav > a:nth-child(3)");
  await clickElement(
    this.page,
    "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a"
  );
  await this.page.waitForSelector(
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper"
  );
  await this.page.waitForSelector(
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken"
  );
});

Then("the booking button should be disabled", async function () {
  const isButtonActive = await isButtonEnabled(
    this.page,
    "body > main > section > button",
    "disabled"
  );
  expect(isButtonActive).to.be.true;
});

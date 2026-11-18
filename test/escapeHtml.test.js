import { test } from "node:test";
import assert from "node:assert/strict";
import { escapeHtml } from "../js/escapeHtml.js";

test("escapeHtml shows <b>Test</b> as plain text", () => {
    assert.equal(escapeHtml("<b>Test</b>"), "&lt;b&gt;Test&lt;/b&gt;");
});

test("escapeHtml stops a script-running image tag", () => {
    assert.equal(escapeHtml("<img src=x onerror=alert(1)>"), "&lt;img src=x onerror=alert(1)&gt;");
});

test("escapeHtml escapes & and both kinds of quotes", () => {
    assert.equal(escapeHtml(`Tom & "Jerry's"`), "Tom &amp; &quot;Jerry&#39;s&quot;");
});

test("escapeHtml leaves normal text unchanged", () => {
    assert.equal(escapeHtml("Classic Latte"), "Classic Latte");
});

test("escapeHtml turns a number into text", () => {
    assert.equal(escapeHtml(4.5), "4.5");
});

import { computed as r, input as l, output as d } from "@angular/core";
import * as t from "@angular/core";
function p(n, e) { if (n & 1) {
    let i = t.\u0275\u0275getCurrentView();
    t.\u0275\u0275domElementStart(0, "div", 4)(1, "p", 5), t.\u0275\u0275text(2, "Selected movie"), t.\u0275\u0275domElementEnd(), t.\u0275\u0275domElementStart(3, "h3", 6), t.\u0275\u0275text(4), t.\u0275\u0275domElementEnd()(), t.\u0275\u0275domElementStart(5, "div", 7)(6, "span", 8), t.\u0275\u0275text(7), t.\u0275\u0275domElementEnd(), t.\u0275\u0275domElementStart(8, "span", 9), t.\u0275\u0275text(9, "tickets available"), t.\u0275\u0275domElementEnd()(), t.\u0275\u0275domElementStart(10, "button", 10), t.\u0275\u0275domListener("click", function () { t.\u0275\u0275restoreView(i); let o = t.\u0275\u0275nextContext(); return t.\u0275\u0275resetView(o.continueBooking()); }), t.\u0275\u0275text(11, " Continue booking "), t.\u0275\u0275domElementEnd();
} if (n & 2) {
    let i = t.\u0275\u0275nextContext();
    t.\u0275\u0275advance(4), t.\u0275\u0275textInterpolate(e.title), t.\u0275\u0275advance(3), t.\u0275\u0275textInterpolate(i.availableTickets());
} }
function m(n, e) { n & 1 && (t.\u0275\u0275domElementStart(0, "div", 3), t.\u0275\u0275text(1, "Select a movie to see ticket availability."), t.\u0275\u0275domElementEnd()); }
var c = class n {
    availabilityByMovieId = { 1: 43, 2: 212, 3: 9 };
    movie = l(null);
    bookingContinued = d();
    availableTickets = r(() => { let e = this.movie(); return e ? this.availabilityByMovieId[e.id] ?? 0 : 0; });
    continueBooking() { let e = this.movie(); e && this.bookingContinued.emit(e); }
    static \u0275fac = function (i) { return new (i || n); };
    static \u0275cmp = t.\u0275\u0275defineComponent({ type: n, selectors: [["app-root"]], inputs: { movie: [1, "movie"] }, outputs: { bookingContinued: "bookingContinued" }, decls: 7, vars: 1, consts: [[1, "ticket"], [1, "ticket__eyebrow"], [1, "ticket__title"], [1, "ticket__empty"], [1, "ticket__movie"], [1, "ticket__label"], [1, "ticket__movie-title"], [1, "ticket__counter"], [1, "ticket__counter-value"], [1, "ticket__counter-label"], ["type", "button", 1, "ticket__button", 3, "click"]], template: function (i, a) { if (i & 1 && (t.\u0275\u0275domElementStart(0, "section", 0)(1, "p", 1), t.\u0275\u0275text(2, "Booking status"), t.\u0275\u0275domElementEnd(), t.\u0275\u0275domElementStart(3, "h2", 2), t.\u0275\u0275text(4, "Ticket Availability"), t.\u0275\u0275domElementEnd(), t.\u0275\u0275conditionalCreate(5, p, 12, 2)(6, m, 2, 0, "div", 3), t.\u0275\u0275domElementEnd()), i & 2) {
            let o;
            t.\u0275\u0275advance(5), t.\u0275\u0275conditional((o = a.movie()) ? 5 : 6, o);
        } }, styles: ["[_nghost-%COMP%]{display:block}.ticket[_ngcontent-%COMP%]{display:grid;gap:20px}.ticket__eyebrow[_ngcontent-%COMP%]{width:fit-content;margin:0;padding:6px 10px;border-radius:999px;color:#4338ca;background:#eef2ff;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.ticket__title[_ngcontent-%COMP%]{margin:0;font-size:34px;line-height:.95;letter-spacing:-.06em}.ticket__movie[_ngcontent-%COMP%]{display:grid;gap:6px;padding-top:10px}.ticket__label[_ngcontent-%COMP%]{margin:0;color:#64748b;font-size:13px;font-weight:700}.ticket__movie-title[_ngcontent-%COMP%]{margin:0;font-size:22px;line-height:1.15;letter-spacing:-.04em}.ticket__counter[_ngcontent-%COMP%]{display:grid;gap:4px;padding:22px;border-radius:22px;color:#fff;background:radial-gradient(circle at top right,rgba(255,255,255,.24),transparent 10rem),linear-gradient(135deg,#111827,#4f46e5)}.ticket__counter-value[_ngcontent-%COMP%]{font-size:56px;line-height:1;font-weight:900;letter-spacing:-.08em}.ticket__counter-label[_ngcontent-%COMP%]{color:#ffffffc7;font-size:14px;font-weight:700}.ticket__button[_ngcontent-%COMP%]{border:0;border-radius:16px;padding:13px 16px;color:#fff;background:#111827;font:inherit;font-weight:800;cursor:pointer}.ticket__button[_ngcontent-%COMP%]:hover{background:#4f46e5}.ticket__empty[_ngcontent-%COMP%]{padding:18px;border:1px dashed #cbd5e1;border-radius:18px;color:#64748b;background:#f8fafc;font-size:15px;line-height:1.5}"] });
};
export { c as App, c as TicketAvailabilityWidgetComponent };

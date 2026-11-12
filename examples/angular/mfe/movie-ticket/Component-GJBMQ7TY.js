var s = (n, t, o) => new Promise((i, r) => { var a = c => { try {
    m(o.next(c));
}
catch (u) {
    r(u);
} }, d = c => { try {
    m(o.throw(c));
}
catch (u) {
    r(u);
} }, m = c => c.done ? i(c.value) : Promise.resolve(c.value).then(a, d); m((o = o.apply(n, t)).next()); });
import { afterNextRender as P, inject as W, signal as A, viewChild as w, ViewContainerRef as f } from "@angular/core";
var g = { movies: { id: "movies", remoteName: "movies", exposedModule: "./Widget", exportName: "MoviesWidgetComponent" }, ticketAvailability: { id: "ticketAvailability", remoteName: "ticket-availability", exposedModule: "./Widget", exportName: "TicketAvailabilityWidgetComponent" } };
import { inject as _, signal as S } from "@angular/core";
var h, E;
var M = new Promise((n, t) => { h = n, E = t; });
function R(n, t) { if (typeof n == "string" && t)
    return { remoteName: n, exposedModule: t }; if (typeof n == "object" && !t)
    return n; throw new Error("unexpected arguments: please pass options or a remoteName/exposedModule-pair"); }
function y(n) { typeof window < "u" && console.error(n); }
function k(n) { return s(this, null, function* () { let t = yield fetch(n); if (!t.ok)
    throw new Error(`Failed to fetch remoteEntry at ${n}: ${t.status} ${t.statusText}`); let o = yield t.json(); if (!o.name)
    throw new Error(`remoteEntry at ${n} does not declare a 'name'`); return o.name; }); }
function b(n, t) { return s(this, null, function* () { let o = R(n, t), { fallback: i } = o; try {
    let r = yield M;
    if (!o.remoteName && o.remoteEntry && (o.remoteName = yield k(o.remoteEntry)), o.remoteEntry && (r = yield r.initRemoteEntry(o.remoteEntry, o.remoteName)), !o.remoteName) {
        let a = "unexpected arguments: Please pass remoteName or remoteEntry";
        if (!i)
            throw new Error(a);
        return y(a), i;
    }
    return yield r.loadRemoteModule(o.remoteName, o.exposedModule);
}
catch (r) {
    if (i)
        return y("error loading remote module: " + (r instanceof Error ? r.message : String(r))), i;
    throw r;
} }); }
import * as v from "@angular/core";
var p = class n {
    loadRemoteComponent(r) { return s(this, arguments, function* ({ remoteName: t, exposedModule: o, exportName: i }) { try {
        let a = yield b(t, o), d = a[i];
        return d || (console.error(`Remote export "${i}" was not found`, a), null);
    }
    catch (a) {
        return console.error(`Cannot load remote component "${t}"`, a), null;
    } }); }
    static \u0275fac = function (o) { return new (o || n); };
    static \u0275prov = v.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac, providedIn: "root" });
};
import * as C from "@angular/core";
var l = class n {
    microFrontendService = _(p);
    componentRefs = new Set;
    createState() { return S({ status: "idle", error: null }); }
    mount(r) { return s(this, arguments, function* ({ config: t, getContainer: o, state: i }) { i.set({ status: "loading", error: null }); try {
        let a = yield this.microFrontendService.loadRemoteComponent({ remoteName: t.remoteName, exposedModule: t.exposedModule, exportName: t.exportName });
        if (!a)
            throw new Error(`Remote widget "${t.id}" was not loaded`);
        let d = o();
        d.clear();
        let m = d.createComponent(a);
        return m.changeDetectorRef.detectChanges(), this.componentRefs.add(m), m.onDestroy(() => { this.componentRefs.delete(m); }), i.set({ status: "ready", error: null }), m;
    }
    catch (a) {
        return console.error(`Cannot mount remote widget "${t.id}"`, a), i.set({ status: "error", error: a }), null;
    } }); }
    ngOnDestroy() { for (let t of this.componentRefs)
        t.destroy(); this.componentRefs.clear(); }
    static \u0275fac = function (o) { return new (o || n); };
    static \u0275prov = C.\u0275\u0275defineInjectable({ token: n, factory: n.\u0275fac });
};
import * as e from "@angular/core";
var O = ["movies"], T = ["ticketAvailability"];
function I(n, t) { n & 1 && (e.\u0275\u0275domElementStart(0, "p", 6), e.\u0275\u0275text(1, "Loading movies widget..."), e.\u0275\u0275domElementEnd()); }
function N(n, t) { n & 1 && (e.\u0275\u0275domElementStart(0, "p", 7), e.\u0275\u0275text(1, "Movies widget is temporarily unavailable."), e.\u0275\u0275domElementEnd()); }
function D(n, t) { n & 1 && (e.\u0275\u0275domElementStart(0, "p", 6), e.\u0275\u0275text(1, "Loading ticket widget..."), e.\u0275\u0275domElementEnd()); }
function F(n, t) { n & 1 && (e.\u0275\u0275domElementStart(0, "p", 7), e.\u0275\u0275text(1, " Ticket availability widget is temporarily unavailable. "), e.\u0275\u0275domElementEnd()); }
function L(n, t) { n & 1 && (e.\u0275\u0275domElementStart(0, "p", 9), e.\u0275\u0275text(1), e.\u0275\u0275domElementEnd()), n & 2 && (e.\u0275\u0275advance(), e.\u0275\u0275textInterpolate1(" ", t, " ")); }
var x = class n {
    remoteWidgetLoader = W(l);
    moviesContainer = w.required("movies", { read: f });
    ticketAvailabilityContainer = w.required("ticketAvailability", { read: f });
    moviesState = this.remoteWidgetLoader.createState();
    ticketAvailabilityState = this.remoteWidgetLoader.createState();
    bookingMessage = A(null);
    constructor() { P(() => { this.initRemoteWidgets(); }); }
    initRemoteWidgets() { return s(this, null, function* () { let t = yield this.mountRemoteWidgets(); t && (this.connectMovieSelection(t), this.connectBookingFlow(t)); }); }
    mountRemoteWidgets() { return s(this, null, function* () { let [t, o] = yield Promise.all([this.remoteWidgetLoader.mount({ config: g.movies, getContainer: () => this.moviesContainer(), state: this.moviesState }), this.remoteWidgetLoader.mount({ config: g.ticketAvailability, getContainer: () => this.ticketAvailabilityContainer(), state: this.ticketAvailabilityState })]); return !t || !o ? null : { moviesRef: t, ticketAvailabilityRef: o }; }); }
    connectMovieSelection({ moviesRef: t, ticketAvailabilityRef: o }) { let i = t.instance.movieSelected.subscribe(r => { o.setInput("movie", r); }); t.onDestroy(() => { i.unsubscribe(); }); }
    connectBookingFlow({ ticketAvailabilityRef: t }) { let o = t.instance.bookingContinued.subscribe(i => { this.bookingMessage.set(`\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u043C \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u043C\u0430 \xAB${i.title}\xBB`); }); t.onDestroy(() => { o.unsubscribe(); }); }
    static \u0275fac = function (o) { return new (o || n); };
    static \u0275cmp = e.\u0275\u0275defineComponent({ type: n, selectors: [["app-root"]], viewQuery: function (o, i) { o & 1 && e.\u0275\u0275viewQuerySignal(i.moviesContainer, O, 5, f)(i.ticketAvailabilityContainer, T, 5, f), o & 2 && e.\u0275\u0275queryAdvance(2); }, features: [e.\u0275\u0275ProvidersFeature([l])], decls: 17, vars: 5, consts: [["movies", ""], ["ticketAvailability", ""], [1, "container"], [1, "wrapper-container"], ["aria-label", "Movies", 1, "wrapper", "left"], [1, "widget"], [1, "widget-state"], [1, "widget-state", "widget-state_error"], ["aria-label", "Ticket availability", 1, "wrapper", "right"], ["aria-live", "polite", 1, "booking-message"]], template: function (o, i) { if (o & 1 && (e.\u0275\u0275domElementStart(0, "div", 2)(1, "h1"), e.\u0275\u0275text(2, "Movie Ticket Booking"), e.\u0275\u0275domElementEnd(), e.\u0275\u0275domElementStart(3, "div", 3)(4, "section", 4)(5, "div", 5), e.\u0275\u0275conditionalCreate(6, I, 2, 0, "p", 6), e.\u0275\u0275conditionalCreate(7, N, 2, 0, "p", 7), e.\u0275\u0275domElementContainer(8, null, 0), e.\u0275\u0275domElementEnd()(), e.\u0275\u0275domElementStart(10, "aside", 8)(11, "div", 5), e.\u0275\u0275conditionalCreate(12, D, 2, 0, "p", 6), e.\u0275\u0275conditionalCreate(13, F, 2, 0, "p", 7), e.\u0275\u0275domElementContainer(14, null, 1), e.\u0275\u0275domElementEnd()()(), e.\u0275\u0275conditionalCreate(16, L, 2, 1, "p", 9), e.\u0275\u0275domElementEnd()), o & 2) {
            let r;
            e.\u0275\u0275advance(6), e.\u0275\u0275conditional(i.moviesState().status === "loading" ? 6 : -1), e.\u0275\u0275advance(), e.\u0275\u0275conditional(i.moviesState().status === "error" ? 7 : -1), e.\u0275\u0275advance(5), e.\u0275\u0275conditional(i.ticketAvailabilityState().status === "loading" ? 12 : -1), e.\u0275\u0275advance(), e.\u0275\u0275conditional(i.ticketAvailabilityState().status === "error" ? 13 : -1), e.\u0275\u0275advance(3), e.\u0275\u0275conditional((r = i.bookingMessage()) ? 16 : -1, r);
        } }, styles: ["[_nghost-%COMP%]{display:block;min-height:100vh;color:#172033;background:radial-gradient(circle at top left,rgba(99,102,241,.14),transparent 32rem),linear-gradient(180deg,#f8fafc,#eef2f7);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}.container[_ngcontent-%COMP%]{width:min(1280px,calc(100% - 48px));margin:0 auto;padding:48px 0}.container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0 0 28px;font-size:clamp(32px,5vw,56px);line-height:1;letter-spacing:-.06em}.wrapper-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,340px);gap:24px;align-items:start}.wrapper[_ngcontent-%COMP%]{min-width:0}.widget[_ngcontent-%COMP%]{min-height:100%;border:1px solid rgba(148,163,184,.28);border-radius:28px;background:#ffffffd1;box-shadow:0 24px 80px #0f172a14,0 1px #fffc inset;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.wrapper.left[_ngcontent-%COMP%]   .widget[_ngcontent-%COMP%]{padding:28px}.wrapper.right[_ngcontent-%COMP%]   .widget[_ngcontent-%COMP%]{position:sticky;top:24px;padding:28px}@media(max-width:900px){.container[_ngcontent-%COMP%]{width:min(100% - 32px,720px);padding:32px 0}.wrapper-container[_ngcontent-%COMP%]{grid-template-columns:1fr}.wrapper.right[_ngcontent-%COMP%]   .widget[_ngcontent-%COMP%]{position:static}}.widget-state[_ngcontent-%COMP%]{margin:0;padding:18px;border:1px dashed #cbd5e1;border-radius:18px;color:#64748b;background:#f8fafc;font-size:15px;line-height:1.5}.widget-state_error[_ngcontent-%COMP%]{border-color:#fecaca;color:#991b1b;background:#fef2f2}.booking-message[_ngcontent-%COMP%]{margin:24px 0 0;padding:16px 18px;border:1px solid #bbf7d0;border-radius:12px;color:#166534;background:#f0fdf4;font-weight:600}"] });
};
export { x as App };

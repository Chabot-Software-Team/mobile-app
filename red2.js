var p = {
        layer_count: 0,
        number3: 0
    },
    cssId = "Css_withe";
window.innerWidth - 200 > 1.77 * window.innerHeight - 220 ? (p.box_height = Math.round(window.innerHeight - 200), p.box_width = Math.round(p.box_height / 9 * 16)) : (p.box_width = Math.round(window.innerWidth - 130), p.box_height = Math.round(p.box_width / 16 * 9));
p.can_width = p.box_width + 200;
p.can_height = p.box_height + 80;
document.getElementById("paperCanvasbox").style.cssText = "position: fixed; top: 28px; left: 100px; width: " + p.box_width + "px; height: " + p.box_height + "px; background-color: rgb(255, 255, 255); box-shadow: 0px 1px 46px -10px #55555569; pointer-events: none; transition: all 0.1s ease-out;";
document.getElementById("paperCanvas").style.cssText = "position: fixed; top: 0px; left: 0px; width: " + p.can_width + "px; height: " + p.can_height + "px; z-index: 30;";
document.getElementById("animationstage").style.cssText = "position: fixed; top: 28px; left: 100px; width: " + p.box_width + "px; height: " + p.box_height + "px; background-color: rgb(255, 255, 255); z-index: 52;";
var addframe = function () {
    p.number3 += 1;
    1 == p.number3 && (document.getElementById("tp_0").className = "dnon1");
    pg.selection.clearSelection();
    var c = document.getElementById("paperCanvas").toDataURL(),
        a = document.getElementById("timeline_point_intern");
    a.innerHTML = a.innerHTML + '<div class="timeline_point_holder"><img id="tp_' + p.number3 + '" onClick="showVal4(this.id)" class="timeline_point_neutral" src="' + c + '"><input type="range" step="0.1" min="0.1" max="5" value="1" oninput="showVal(this.id, this.value)" onchange="showVal2(this.id, this.value)" class="slider" id="duration_' +
        p.number3 + '"><form><select id="easing_' + p.number3 + '" name="Easing" class="easing" onchange="showVal3(this.id, this.value)"><option value="linear">Linear</option><option value="circ-in">Circ In</option><option value="circ-out">Circ Out</option><option value="circ-in-out">Circ In/Out</option><option value="cubic-in">Cubic In</option><option value="cubic-out">Cubic Out</option><option value="cubic-in-out">Cubic In/Out</option><option value="elastic-out">Elastic Out</option><option value="elastic-in-out">Elastic In/Out</option><option value="expo-in">Expo In</option><option value="expo-out">Expo Out</option><option value="expo-in-out">Expo In/Out</option><option value="quad-in">Quad In</option><option value="quad-out">Quad Out</option><option value="quad-in-out">Quad In/Out</option><option value="quart-in">Quart In</option><option value="quart-out">Quart Out</option><option value="quart-in-out">Quart In/Out</option><option value="quint-in">Quint In</option><option value="quint-out">Quint Out</option><option value="quint-in-out">Quint In/Out</option><option value="sine-in">Sine In</option><option value="sine-out">Sine Out</option><option value="sine-in-out">Sine In/Out</option></select></form><div class="saveicon"><img src="stage/icon/minus_icon.svg" id="save_frame_' +
        p.number3 + '" class="icon3" onclick="saveframe(this.id)" alt="Save frame"><img src="stage/icon/plus_icon.svg" id="add_frame_' + p.number3 + '" class="icon4" onClick="showVal5(this.id)" alt="Add frame"></div><p><span class="showduration" id="showduration_' + p.number3 + '"></span></p></div>';
    copySelectionToClipboard4()
};

function scrollLef() {
    document.getElementById("timeline_point").scrollLeft += 192
}

function saveframe(c) {
    var a = c.substring(c.length, 11);
    c = "layer_nr_" + a;
    var b = "tp_" + a;
    1 == p.number3 && (document.getElementById("tp_0").className = "dnon1");
    pg.selection.clearSelection();
    var e = document.getElementById("paperCanvas").toDataURL();
    document.getElementById(b).outerHTML = '<img id="tp_' + a + '" onClick="showVal4(this.id)" class="timeline_point_neutral" src="' + e + '">';
    var d = paper.project.exportJSON({
        asString: !0
    });
    b = d.indexOf("svg_nr");
    e = b + 100;
    var h = d.substring(e, b).indexOf(",") + b - 1,
        f = d.substring(h, b);
    d = d.replace(f, "svg_nr_" + a);
    var g = d.indexOf('["Layer",{"name":"pg.internalGuideLayer"');
    g = d.substring(d.length, g);
    var l = d.indexOf(',["Layer",{"name":"pg.internalGuideLayer"');
    d.substring(l, 0);
    120 < g.length ? (a = g.indexOf('"children":[') + 12, b = g.indexOf("}]]") + 2, a = g.substring(b, a), a = d.replace(']}],["Layer",{"name":"pg.internalGuideLayer"', "," + a + ']}],["Layer",{"name":"pg.internalGuideLayer"'), b = a.indexOf(',["Layer",{"name":"pg.internalGuideLayer"'), a = a.substring(b, 0) + "]", p[c] = a) : (d = pg.layer.getGuideLayer(),
        void 0 !== d && d.remove(), d = paper.project.exportJSON({
            asString: !0
        }), d.indexOf("svg_nr"), d.substring(e, b).indexOf(","), d.substring(h, b), a = d.replace(f, "svg_nr_" + a), p[c] = a);
    a = pg.layer.getActiveLayer().id;
    pg.layer.deleteLayer(a);
    loadJSONDocument2(p[c])
}

function showVal(c, a) {
    document.getElementById("show" + c).innerHTML = a + " S"
}

function showVal3(c, a) {
    var b = document.getElementById(c).outerHTML.replace('selected="selected" ', ""),
        e = b.indexOf(a) - 7,
        d = b.substring(e, 0);
    b = b.substring(b.length, e);
    d = d + 'selected="selected" ' + b;
    document.getElementById(c).outerHTML = d
}

function showVal2(c, a) {
    document.getElementById(c).outerHTML;
    var b = document.getElementById(c).outerHTML,
        e = b.indexOf("value") + 7,
        d = b.indexOf("oninput") - 2;
    e = b.substring(e, 0);
    b = b.substring(b.length, d);
    b = e + a + b;
    document.getElementById(c).outerHTML = b
}

function showVal4(c) {
    var a = c.substring(c.length, 3);
    c = "layer_nr_" + a;
    showclass("tp_" + a);
    a = pg.layer.getActiveLayer().id;
    pg.layer.deleteLayer(a);
    paper.project.clear();
    pg.toolbar.setDefaultTool();
    pg["export"].setExportRect();
    paper.project.importJSON(p[c]);
    pg.layer.ensureGuideLayer();
    pg.guides.getExportRectGuide()
}

function showVal5(c) {
    var a = c.substring(c.length, 10);
    c = "layer_nr_" + a;
    showclass("tp_" + a);
    a = pg.layer.getActiveLayer().id;
    pg.layer.deleteLayer(a);
    paper.project.clear();
    pg.toolbar.setDefaultTool();
    pg["export"].setExportRect();
    paper.project.importJSON(p[c]);
    pg.layer.ensureGuideLayer();
    pg.guides.getExportRectGuide();
    addframe()
}

function showclass(c) {
    for (var a = document.getElementById("timeline_point_intern").innerHTML.match(/tp_/gi).length - 1, b = 0; b < a; b++) document.getElementById("tp_" + (b + 1)).className = "timeline_point_neutral";
    document.getElementById(c).className = "timeline_point_activ"
}
var copySelectionToClipboard4 = function () {
        p.layer_count += 1;
        var c = "layer_nr_" + p.layer_count;
        pg.hover.clearHoveredItem();
        pg.selection.clearSelection();
        paper.view.update();
        var a = paper.project.exportJSON({
                asString: !0
            }),
            b = a.indexOf("svg_nr"),
            e = b + 100,
            d = a.substring(e, b).indexOf(",") + b - 1,
            h = a.substring(d, b);
        a = a.replace(h, "svg_nr_" + p.layer_count);
        var f = a.indexOf('["Layer",{"name":"pg.internalGuideLayer"');
        f = a.substring(a.length, f);
        var g = a.indexOf(',["Layer",{"name":"pg.internalGuideLayer"');
        a.substring(g, 0);
        120 < f.length ? (b = f.indexOf('"children":[') + 12, e = f.indexOf("}]]") + 2, b = f.substring(e, b), b = a.replace(']}],["Layer",{"name":"pg.internalGuideLayer"', "," + b + ']}],["Layer",{"name":"pg.internalGuideLayer"'), e = b.indexOf(',["Layer",{"name":"pg.internalGuideLayer"'), b = b.substring(e, 0) + "]", p[c] = b) : (a = pg.layer.getGuideLayer(), void 0 !== a && a.remove(), a = paper.project.exportJSON({
            asString: !0
        }), a.indexOf("svg_nr"), a.substring(e, b).indexOf(","), a.substring(d, b), b = a.replace(h, "svg_nr_" + p.layer_count), p[c] = b);
        dellthelayer();
        scrollLef()
    },
    dellthelayer = function () {
        var c = pg.layer.getActiveLayer().id;
        pg.layer.deleteLayer(c);
        pasteObjectsFromClipboard4()
    },
    pasteObjectsFromClipboard4 = function () {
        loadJSONDocument2(p["layer_nr_" + p.layer_count])
    },
    loadJSONDocument2 = function (c) {
        paper.project.clear();
        pg.toolbar.setDefaultTool();
        pg["export"].setExportRect();
        paper.project.importJSON(c);
        pg.layer.ensureGuideLayer();
        (c = pg.guides.getExportRectGuide()) && pg["export"].setExportRect(new paper.Rectangle(c.data.exportRectBounds));
        paper.view.update();
        pg.undo.snapshot("loadJSONDocument")
    };
p.count = 0;
p.count2 = 0;
p.count3 = 1;
p.count4 = 1;
var animationstage = function () {
    p.count3 = p.layer_count + 1;
    document.getElementById("animationstage").className = "animationstage";
    document.getElementById("animationstage").innerHTML = pg.animationstage;
    var c = pg.animationstage.match(/svg_nr_/gi).length;
    pg.animationstagenr = c;
    pg.animationstagenrz = 0;
    pg.animationstageitems = "";
    initstage()
};

function initstage() {
    function c() {
        setTimeout(function () {
            if (p.count4 < pg.animationstagenr) {
                var h = "duration_" + p.count4,
                    f = "easing_" + p.count4;
                p.count4 += 1;
                var g = "svg_nr_" + p.count4;
                b = document.getElementById(h).value * e;
                h = document.getElementById(f).value;
                d.to(g, {
                    rotation: "none",
                    easing: h,
                    duration: b
                });
                c()
            } else 1 == p.count3, p.count4 = 1, hidestage(), 1 == p.vidcheck && a()
        }, b + 20)
    }

    function a() {
        function h() {
            document.getElementById("loadingscreenfull").className = "loadingscreenfull";
            if (p.count > p.count2) {
                p.count2 += 1;
                var l =
                    p.count2,
                    n = document.getElementById("animationstagerender"),
                    m = n.getContext("2d");
                m.clearRect(0, 0, n.width, n.height);
                m.fillStyle = "white";
                m.fillRect(0, 0, 2600, 1500);
                m.save();
                if ("undefined" !== typeof p.srcData) {
                    var r = new Image;
                    r.onload = function () {
                        var k = document.getElementById("animationstagerender"),
                            t = k.getContext("2d");
                        k = Math.max(k.width / this.width, k.height / this.height);
                        t.drawImage(this, 0, 0, this.width * k, this.height * k)
                    };
                    r.src = p.srcData
                }
                var q = new Image;
                q.onload = function () {
                    m.drawImage(q, 0, 0, n.width, n.height);
                    m.save();
                    var k = document.getElementById("animationstagerender");
                    g.addFrame(k);
                    document.getElementById("rendering").innerHTML = "Rendering Video:<br>" + p.count2 + " Pictures rendered (" + p.count + " Pictures total)";
                    h()
                };
                q.src = "data:image/svg+xml;base64," + btoa(p[l])
            } else p.count = 0, p.count2 = 0, f()
        }

        function f() {
            p.vidcheck = 0;
            g.complete().then(function (l) {
                document.getElementById("awesome").src = URL.createObjectURL(l);
                document.getElementById("download").style.display = "";
                document.getElementById("download").href = URL.createObjectURL(l);
                document.getElementById("awesome").className = "timeline_point_activ2";
                document.getElementById("loadingscreenfull").className = "dnone2";
                document.getElementById("timeline_point").scrollLeft = 0;
                setTimeout(function () {
                    document.getElementById("loadingscreenfull").className = "dnone1"
                }, 1E3)
            })
        }
        var g = new WebMWriter({
            frameRate: 30,
            quality: .44,
            transparent: !1
        });
        h()
    }
    var b;
    var e = 1 == p.vidcheck ? 500 : 1E3;
    var d = new SVGMorpheus("#svgviewbox");
    c()
}

function hidestage() {
    document.getElementById("animationstage").className = "dnone1"
}

function vaf() {
    if (1 == p.vidcheck) {
        p.count += 1;
        var c = p.count,
            a = document.getElementById("svgviewbox");
        p[c] = a.outerHTML
    }
}

function play() {
    1 < p.number3 && "dnone1" == document.getElementById("animationstage").className && (p.vidcheck = 0, pg["export"].exportAndPromptSVG())
}

function backw() {
    1 < pg.document.getAllSelectableItems().length && (pg.undo.undo(), pg.toolbar.setDefaultTool())
}

function encodeImage2canvas() {
    var c = document.getElementById("inputFileToLoad").files;
    if (0 < c.length) {
        c = c[0];
        var a = new FileReader;
        a.onload = function (b) {
            p.srcData = b.target.result;
            image2canvas()
        };
        a.readAsDataURL(c)
    }
}
var image2canvas = function () {
    document.getElementById("paperCanvasbox").style.cssText = "position: fixed; top: 28px; left: 100px; width: " + p.box_width + "px; height: " + p.box_height + 'px; background-image: url("' + p.srcData + '");  background-repeat: no-repeat; background-size: cover; box-shadow: 0px 1px 46px -10px #55555569; pointer-events: none; transition: all 0.1s ease-out;';
    document.getElementById("animationstage").style.cssText = "position: fixed; top: 28px; left: 100px; width: " + p.box_width + "px; height: " +
        p.box_height + 'px; background-image: url("' + p.srcData + '"); background-repeat: no-repeat; background-size: cover; z-index: 52;'
};
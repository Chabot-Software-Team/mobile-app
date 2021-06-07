/*The MIT License (MIT)

Copyright (c) 2015 Rolf Fleischmann (@w00dn) http://vol-2.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

var pg = function () {
    return {
        init: function () {
            paper.setup("paperCanvas");
            pg.document.setup();
            pg.layer.setup();
            pg["export"].setup();
            pg.menu.setup();
            pg.stylebar.setup();
            pg.statusbar.setup();
            pg.input.setup();
            pg.toolbar.setup();
            pg.undo.setup()
        }
    }
}();
jQuery.ajaxSetup({
    cache: !1
});
jQuery(window).load(function () {
    pg.init()
});
pg["boolean"] = function () {
    var d = function (e, g) {
            e = e || pg.selection.getSelectedItems();
            g = g || !0;
            for (var c, k = 0; k < e.length; k++) {
                0 == k && (c = e[0]);
                var h = e[k].unite(c, {
                    insert: !1
                });
                c.remove();
                c = h;
                e[k].remove()
            }
            g && a(e, c);
            return c
        },
        f = function (e, g) {
            e = e || pg.selection.getSelectedItems();
            g = g || !0;
            for (var c = e[0], k = [], h = 0; h < e.length; h++) 0 < h && k.push(e[h]);
            k = d(k);
            h = c.subtract(k, {
                insert: !1
            });
            k.remove();
            c.remove();
            g && a(e, h);
            return h
        },
        b = function (e, g) {
            e = e || pg.selection.getSelectedItems();
            g = g || !0;
            for (var c = e[0], k, h = 0; h < e.length; h++) 0 <
                h && (k = e[h].exclude(c, {
                    insert: !1
                }), h + 1 < e.length && (c = k)), c.remove(), e[h].remove();
            g && a(e, k);
            return k
        },
        a = function (e, g) {
            jQuery.each(e, function (c, k) {
                k.remove()
            });
            pg.layer.getActiveLayer().addChild(g);
            pg.undo.snapshot("booleanOperation")
        };
    return {
        booleanUnite: d,
        booleanIntersect: function (e, g) {
            e = e || pg.selection.getSelectedItems();
            g = g || !0;
            for (var c, k, h = 0; h < e.length; h++) 0 == h ? c = e[0] : (k = e[h].intersect(c, {
                insert: !1
            }), h + 1 < e.length && (c = k)), c.remove(), e[h].remove();
            g && a(e, k);
            return k
        },
        booleanSubtract: f,
        booleanExclude: b,
        booleanDivide: function (e, g) {
            e = e || pg.selection.getSelectedItems();
            g = g || !0;
            var c = d(e),
                k = b(e);
            c = f([c, k.clone()]);
            var h = new paper.Group;
            if (k.children)
                for (var t = 0; t < k.children.length; t++) {
                    var x = k.children[t];
                    x.strokeColor = "black";
                    h.addChild(x);
                    t--
                }
            c.strokeColor = "black";
            h.addChild(c);
            g && a(e, h);
            return h
        }
    }
}();
pg.compoundPath = function () {
    var d = function (f) {
        return f && "CompoundPath" === f.className
    };
    return {
        isCompoundPath: d,
        isCompoundPathChild: function (f) {
            return f.parent ? "CompoundPath" === f.parent.className : !1
        },
        getItemsCompoundPath: function (f) {
            f = f.parent;
            return d(f) ? f : null
        },
        createFromSelection: function () {
            var f = pg.selection.getSelectedPaths();
            if (!(2 > f.length)) {
                for (var b = new paper.CompoundPath({
                        fillRule: "evenodd"
                    }), a = 0; a < f.length; a++) b.addChild(f[a]), f[a].selected = !1;
                b = pg.stylebar.applyActiveToolbarStyle(b);
                pg.selection.setItemSelection(b,
                    !0);
                pg.undo.snapshot("createCompoundPathFromSelection")
            }
        },
        releaseSelection: function () {
            for (var f = pg.selection.getSelectedItems(), b = [], a = 0; a < f.length; a++) {
                var e = f[a];
                if (d(e)) {
                    for (var g = 0; g < e.children.length; g++) {
                        var c = e.children[g];
                        c.parent = e.layer;
                        pg.selection.setItemSelection(c, !0);
                        g--
                    }
                    b.push(e);
                    pg.selection.setItemSelection(e, !1)
                } else f[a].parent = e.layer
            }
            for (g = 0; g < b.length; g++) b[g].remove();
            pg.undo.snapshot("releaseCompoundPath")
        }
    }
}();
pg.document = function () {
    function d(c) {
        setTimeout(function () {
            var k = p.t1.indexOf('["Layer",{"name":"svg_nr_'),
                h = p.t1.indexOf("]]}]") + 4;
            k = p.t1.substring(h, k);
            paper.project.importJSON(k);
            p.t1 = p.t1.replace(k, "");
            pg.layer.ensureGuideLayer();
            p.layer_count += 1;
            p["layer_nr_" + p.layer_count] = k;
            e()
        }, 1E3 * c)
    }
    var f, b = [],
        a = function () {
            paper.view.center = new paper.Point(0, 0);
            f = paper.view.center;
            var c = 10;
            paper.view.onFrame = function () {
                0 < c ? c-- : (jQuery(document).trigger("DocumentUpdate"), c = 10)
            };
            window.onbeforeunload = function (k) {
                if (1 <
                    pg.undo.getStates().length) return "Unsaved changes will be lost. Leave anyway?"
            }
        },
        e = function () {
            setTimeout(function () {
                p.number3 += 1;
                1 == p.number3 && (document.getElementById("tp_0").className = "dnon1");
                var c = document.getElementById("paperCanvas").toDataURL(),
                    k = document.getElementById("timeline_point_intern");
                k.innerHTML = k.innerHTML + '<div class="timeline_point_holder"><img id="tp_' + p.number3 + '" onClick="showVal4(this.id)" class="timeline_point_neutral" src="' + c + '"><input type="range" step="0.1" min="0.2" max="10" value="1" oninput="showVal(this.id, this.value)" onchange="showVal2(this.id, this.value)" class="slider" id="duration_' +
                    p.number3 + '"><form><select id="easing_' + p.number3 + '" name="Easing" class="easing" onchange="showVal3(this.id, this.value)"><option value="linear">Linear</option><option value="circ-in">Circ In</option><option value="circ-out">Circ Out</option><option value="circ-in-out">Circ In/Out</option><option value="cubic-in">Cubic In</option><option value="cubic-out">Cubic Out</option><option value="cubic-in-out">Cubic In/Out</option><option value="elastic-out">Elastic Out</option><option value="elastic-in-out">Elastic In/Out</option><option value="expo-in">Expo In</option><option value="expo-out">Expo Out</option><option value="expo-in-out">Expo In/Out</option><option value="quad-in">Quad In</option><option value="quad-out">Quad Out</option><option value="quad-in-out">Quad In/Out</option><option value="quart-in">Quart In</option><option value="quart-out">Quart Out</option><option value="quart-in-out">Quart In/Out</option><option value="quint-in">Quint In</option><option value="quint-out">Quint Out</option><option value="quint-in-out">Quint In/Out</option><option value="sine-in">Sine In</option><option value="sine-out">Sine Out</option><option value="sine-in-out">Sine In/Out</option></select></form><div class="saveicon"><img src="stage/icon/minus_icon.svg" id="save_frame_' +
                    p.number3 + '" class="icon3" onclick="saveframe(this.id)" alt="Save frame"><img src="stage/icon/plus_icon.svg" id="add_frame_' + p.number3 + '" class="icon4" onClick="showVal5(this.id)" alt="Add frame"></div><p><span class="showduration" id="showduration_' + p.number3 + '"></span></p></div>';
                p.layer_count !== p.t1_nr && (c = pg.layer.getActiveLayer().id, pg.layer.deleteLayer(c))
            }, 500)
        },
        g = function () {
            if (0 == p.layer_count5) {
                var c = pg.layer.getActiveLayer().id;
                pg.layer.deleteLayer(c)
            }
            if (p.layer_count5 < p.layer_count) p.layer_count5 +=
                1, c = "layer_nr_" + p.layer_count5, pg.hover.clearHoveredItem(), pg.selection.clearSelection(), paper.view.update(), paper.project.importJSON(p[c]), g();
            else {
                pg.hover.clearHoveredItem();
                pg.selection.clearSelection();
                paper.view.update();
                c = p.fileName.split(".json")[0];
                var k = paper.project.exportJSON({
                    asString: !0
                });
                k = new Blob([k], {
                    type: "text/json"
                });
                saveAs(k, c + ".json");
                for (c = 0; c < paper.project.layers.length; c++) pg.layer.deleteLayer(paper.project.layers[c].id);
                c = pg.layer.getActiveLayer().id;
                pg.layer.deleteLayer(c);
                c = "layer_nr_" + p.layer_count5;
                paper.project.clear();
                pg.toolbar.setDefaultTool();
                pg["export"].setExportRect();
                paper.project.importJSON(p[c]);
                pg.layer.ensureGuideLayer();
                (c = pg.guides.getExportRectGuide()) && pg["export"].setExportRect(new paper.Rectangle(c.data.exportRectBounds));
                paper.view.update();
                pg.undo.snapshot("loadJSONDocument");
                null == p.fileName
            }
        };
    return {
        getCenter: function () {
            return f
        },
        setup: a,
        clear: function () {
            paper.project.clear();
            pg.undo.clear();
            a();
            pg.layer.setup()
        },
        getClipboard: function () {
            return b
        },
        pushClipboard: function (c) {
            b.push(c);
            return !0
        },
        clearClipboard: function () {
            b = [];
            return !0
        },
        getAllSelectableItems: function () {
            for (var c = pg.helper.getAllPaperItems(), k = [], h = 0; h < c.length; h++) c[h].data && !c[h].data.isHelperItem && k.push(c[h]);
            return k
        },
        loadJSONDocument: function (c) {
            p.t1 = c;
            p.t1_nr = p.t1.match(/svg_nr_/gi).length;
            paper.project.clear();
            pg.toolbar.setDefaultTool();
            pg["export"].setExportRect();
            for (c = 0; c < p.t1_nr; c++) d(c);
            (c = pg.guides.getExportRectGuide()) && pg["export"].setExportRect(new paper.Rectangle(c.data.exportRectBounds));
            paper.view.update();
            pg.undo.snapshot("loadJSONDocument")
        },
        saveJSONDocument: function () {
            p.fileName = prompt("Name your file", "export.json");
            null !== p.fileName && (p.layer_count5 = 0, g())
        }
    }
}();
pg.edit = function () {
    return {
        copySelectionToClipboard: function () {
            pg.document.clearClipboard();
            var d = pg.selection.getSelectedItems();
            if (0 < d.length)
                for (var f = 0; f < d.length; f++) {
                    var b = d[f].exportJSON({
                        asString: !1
                    });
                    pg.document.pushClipboard(b)
                }
        },
        pasteObjectsFromClipboard: function () {
            pg.undo.snapshot("pasteObjectsFromClipboard");
            pg.selection.clearSelection();
            var d = pg.document.getClipboard();
            if (d && 0 < d.length) {
                for (var f = 0; f < d.length; f++) {
                    var b = paper.Base.importJSON(d[f]);
                    b && (b.selected = !0);
                    b = pg.layer.getActiveLayer().addChild(b);
                    b.position.x += 20;
                    b.position.y += 20
                }
                paper.project.view.update()
            }
        }
    }
}();
pg["export"] = function () {
    var d, f;
    p.layer_count2 = 0;
    p.vidcheck = 0;
    var b = function () {
        if (0 == p.layer_count2) {
            var a = pg.layer.getActiveLayer().id;
            pg.layer.deleteLayer(a)
        }
        if (p.layer_count2 < p.layer_count) p.layer_count2 += 1, a = "layer_nr_" + p.layer_count2, pg.hover.clearHoveredItem(), pg.selection.clearSelection(), paper.view.update(), paper.project.importJSON(p[a]), b();
        else {
            pg.hover.clearHoveredItem();
            pg.selection.clearSelection();
            a = pg.layer.getActiveLayer();
            paper.view.update();
            var e = paper.project.exportSVG({
                    asString: !0,
                    bounds: d
                }).replace("<g>", "").replace("</g></svg>", ""),
                g = e.split("<g", 1);
            g = e.replace(g, "").split("</g>", 1);
            e = e.replace(g + "</g>", "") + g + "</g></svg>";
            new Blob([e], {
                type: "image/svg+xml;charset=" + document.characterSet
            });
            pg.animationstage = e;
            a.activate();
            animationstage();
            for (a = 0; a < paper.project.layers.length; a++) pg.layer.deleteLayer(paper.project.layers[a].id);
            a = pg.layer.getActiveLayer().id;
            pg.layer.deleteLayer(a);
            a = "layer_nr_" + p.layer_count2;
            p.layer_count2 = 0;
            paper.project.clear();
            pg.toolbar.setDefaultTool();
            pg["export"].setExportRect();
            paper.project.importJSON(p[a]);
            pg.layer.ensureGuideLayer();
            (a = pg.guides.getExportRectGuide()) && pg["export"].setExportRect(new paper.Rectangle(a.data.exportRectBounds));
            paper.view.update();
            pg.undo.snapshot("loadJSONDocument")
        }
    };
    return {
        setup: function () {
            f = document.getElementById("paperCanvas")
        },
        getExportRect: function () {
            return d
        },
        setExportRect: function (a) {
            d = a
        },
        clearExportRect: function () {
            d = null
        },
        exportAndPromptImage: function () {
            var a = prompt("Name your file", "export");
            if (null !==
                a) {
                pg.hover.clearHoveredItem();
                pg.selection.clearSelection();
                var e = pg.layer.getActiveLayer(),
                    g = pg.layer.getGuideLayer(),
                    c = g.exportJSON();
                void 0 !== g && g.remove();
                paper.view.update();
                if (d) {
                    pg.view.resetZoom();
                    pg.view.resetPan();
                    paper.view.update();
                    g = parseInt(.5 * f.width) + d.x;
                    var k = parseInt(.5 * f.height) + d.y,
                        h = a.split(".png")[0];
                    a = f.getContext("2d").getImageData(g, k, d.width, d.height);
                    g = jQuery('<canvas width="' + d.width + '" height="' + d.height + '" style="position: absolute; z-index: -5;">');
                    jQuery("body").append(g);
                    g[0].getContext("2d").putImageData(a, 0, 0);
                    g[0].toBlob(function (t) {
                        saveAs(t, h + ".png");
                        paper.project.importJSON(c);
                        e.activate()
                    });
                    g.remove()
                } else h = a.split(".png")[0], f.toBlob(function (t) {
                    saveAs(t, h + ".png");
                    paper.project.importJSON(c);
                    e.activate()
                })
            }
        },
        exportAndPromptSVG: b
    }
}();
pg.geometry = function () {
    return {
        switchHandle: function (d, f) {
            if ("linear" == f) d.clearHandles();
            else if ("smooth" !== f && d.hasHandles() || !d.next || !d.previous)
                if ("smooth" !== f && d.hasHandles()) d.clearHandles();
                else if (d.clearHandles(), d.next) {
                var b = (d.point - d.next.point).length;
                b *= .3;
                20 < b && (b = 20);
                b = (d.point - d.next.point).normalize(b);
                d.handleIn = b;
                d.handleOut = -b
            } else d.previous && (b = (d.point - d.previous.point).length, b *= .3, 20 < b && (b = 20), b = (d.point - d.previous.point).normalize(b), d.handleIn = -b, d.handleOut = b);
            else {
                d.clearHandles();
                b = (d.previous.point - d.point).angle - (d.next.point - d.point).angle;
                0 > b && (b += 360);
                b = .5 * (180 - b);
                var a = (d.next.point - d.point).length,
                    e = (d.previous.point - d.point).length,
                    g = a;
                a > e && (g = e);
                g *= .3;
                20 < g && (g = 20);
                b = (d.next.point - d.point).normalize(g).rotate(-b, 0);
                d.handleOut = b;
                d.handleIn = -b
            }
        }
    }
}();
pg.group = function () {
    var d = function (a) {
            for (var e = [], g = 0; g < a.length; g++) {
                var c = a[g];
                b(c) && !c.data.isPGTextItem && (f(c, !1), c.hasChildren() || e.push(c))
            }
            for (a = 0; a < e.length; a++) e[a].remove();
            jQuery(document).trigger("Ungrouped");
            pg.undo.snapshot("ungroupItems")
        },
        f = function (a, e) {
            if (a && a.children && b(a)) {
                a.applyMatrix = !0;
                for (var g = 0; g < a.children.length; g++) {
                    var c = a.children[g];
                    c.hasChildren() ? e ? f(c, !0) : (c.applyMatrix = !0, a.layer.addChild(c), g--) : (c.applyMatrix = !0, a.layer.addChild(c), g--)
                }
            }
        },
        b = function (a) {
            return pg.item.isGroupItem(a)
        };
    return {
        groupSelection: function () {
            var a = pg.selection.getSelectedItems();
            return 0 < a.length ? (a = new paper.Group(a), pg.selection.clearSelection(), pg.selection.setItemSelection(a, !0), pg.undo.snapshot("groupSelection"), jQuery(document).trigger("Grouped"), a) : !1
        },
        ungroupSelection: function () {
            var a = pg.selection.getSelectedItems();
            d(a);
            pg.statusbar.update()
        },
        groupItems: function (a) {
            return 0 < a.length ? (a = new paper.Group(a), jQuery(document).trigger("Grouped"), pg.undo.snapshot("groupItems"), a) : !1
        },
        ungroupItems: d,
        getItemsGroup: function (a) {
            a = a.parent;
            return b(a) ? a : null
        },
        isGroup: b,
        isGroupChild: function (a) {
            a = pg.item.getRootItem(a);
            return b(a)
        }
    }
}();
pg.guides = function () {
    var d = function (b) {
            b.strokeWidth = 1 / paper.view.zoom;
            b.opacity = 1;
            b.blendMode = "normal";
            b.guide = !0
        },
        f = function () {
            for (var b = [], a = 0; a < paper.project.layers.length; a++)
                for (var e = paper.project.layers[a], g = 0; g < e.children.length; g++) {
                    var c = e.children[g];
                    c.guide && b.push(c)
                }
            return b
        };
    return {
        hoverItem: function (b) {
            var a = new paper.Path(b.item.segments);
            d(a);
            b.item.closed && (a.closed = !0);
            a.parent = pg.layer.getGuideLayer();
            a.strokeColor = "#009dec";
            a.fillColor = null;
            a.data.isHelperItem = !0;
            a.bringToFront();
            return a
        },
        hoverBounds: function (b) {
            var a = new paper.Path.Rectangle(b.internalBounds);
            a.matrix = b.matrix;
            d(a);
            a.parent = pg.layer.getGuideLayer();
            a.strokeColor = "#009dec";
            a.fillColor = null;
            a.data.isHelperItem = !0;
            a.bringToFront();
            return a
        },
        rectSelect: function (b, a) {
            var e = new paper.Point(.5 / paper.view.zoom, .5 / paper.view.zoom),
                g = b.downPoint.add(e);
            e = b.point.add(e);
            g = new paper.Path.Rectangle(g, e);
            e = 1 / paper.view.zoom;
            d(g);
            a || (a = "#aaaaaa");
            g.parent = pg.layer.getGuideLayer();
            g.strokeColor = a;
            g.data.isRectSelect = !0;
            g.data.isHelperItem = !0;
            g.dashArray = [3 * e, 3 * e];
            return g
        },
        line: function (b, a, e) {
            b = new paper.Path.Line(b, a);
            a = 1 / paper.view.zoom;
            d(b);
            e || (e = "#aaaaaa");
            b.parent = pg.layer.getGuideLayer();
            b.strokeColor = e;
            b.strokeColor = e;
            b.dashArray = [5 * a, 5 * a];
            b.data.isHelperItem = !0;
            return b
        },
        crossPivot: function (b, a) {
            var e = 1 / paper.view.zoom,
                g = new paper.Path.Star(b, 4, 4 * e, .5 * e);
            d(g);
            a || (a = "#009dec");
            g.parent = pg.layer.getGuideLayer();
            g.fillColor = a;
            g.strokeColor = a;
            g.strokeWidth = .5 * e;
            g.data.isHelperItem = !0;
            g.rotate(45);
            return g
        },
        rotPivot: function (b, a) {
            var e = new paper.Path.Circle(b, 1 / paper.view.zoom * 3);
            d(e);
            a || (a = "#009dec");
            e.parent = pg.layer.getGuideLayer();
            e.fillColor = a;
            e.data.isHelperItem = !0;
            return e
        },
        label: function (b, a, e) {
            b = new paper.PointText(b);
            e || (e = "#aaaaaa");
            b.parent = pg.layer.getGuideLayer();
            b.fillColor = e;
            b.content = a
        },
        removeAllGuides: function () {
            pg.helper.removePaperItemsByTags(["guide"])
        },
        removeHelperItems: function () {
            pg.helper.removePaperItemsByDataTags(["isHelperItem"])
        },
        removeExportRectGuide: function () {
            pg.helper.removePaperItemsByDataTags(["isExportRect"])
        },
        getAllGuides: f,
        getExportRectGuide: function () {
            for (var b = f(), a = 0; a < b.length; a++)
                if (b[a].data && b[a].data.isExportRect) return b[a]
        },
        getGuideColor: function (b) {
            if ("blue" == b) return "#009dec";
            if ("grey" == b) return "#aaaaaa"
        },
        setDefaultGuideStyle: d
    }
}();
pg.helper = function () {
    var d = function (f) {
        f = f || !1;
        for (var b = [], a = 0; a < paper.project.layers.length; a++)
            for (var e = paper.project.layers[a], g = 0; g < e.children.length; g++) {
                var c = e.children[g];
                !f && c.guide || b.push(c)
            }
        return b
    };
    return {
        selectedItemsToJSONString: function () {
            var f = pg.selection.getSelectedItems();
            if (0 < f.length) {
                for (var b = '[["Layer",{"applyMatrix":true,"children":[', a = 0; a < f.length; a++) {
                    var e = f[a].exportJSON({
                        asString: !0
                    });
                    a + 1 < f.length && (e += ",");
                    b += e
                }
                return b + "]}]]"
            }
            return null
        },
        getAllPaperItems: d,
        getPaperItemsByLayerID: function (f) {
            var b =
                d(!1),
                a = [];
            jQuery.each(b, function (e, g) {
                g.layer.id == f && a.push(g)
            });
            return a
        },
        getPaperItemsByTags: function (f) {
            var b = d(!0),
                a = [];
            jQuery.each(b, function (e, g) {
                jQuery.each(f, function (c, k) {
                    g[k] && -1 == a.indexOf(g) && a.push(g)
                })
            });
            return a
        },
        removePaperItemsByDataTags: function (f) {
            var b = d(!0);
            jQuery.each(b, function (a, e) {
                jQuery.each(f, function (g, c) {
                    e.data && e.data[c] && e.remove()
                })
            })
        },
        removePaperItemsByTags: function (f) {
            var b = d(!0);
            jQuery.each(b, function (a, e) {
                jQuery.each(f, function (g, c) {
                    e[c] && e.remove()
                })
            })
        },
        processFileInput: function (f,
            b, a) {
            var e = new FileReader;
            "text" == f ? e.readAsText(b.files[0]) : "dataURL" == f && e.readAsDataURL(b.files[0]);
            e.onload = function () {
                a(e.result)
            }
        },
        executeFunctionByName: function (f, b) {
            for (var a = [].slice.call(arguments).splice(2), e = f.split("."), g = e.pop(), c = 0; c < e.length; c++) b = b[e[c]];
            return b[g].apply(b, a)
        }
    }
}();
pg.hover = function () {
    var d, f = function () {
        void 0 !== d && (d.remove(), d = void 0);
        paper.view.update()
    };
    return {
        handleHoveredItem: function (b, a) {
            var e = paper.project.hitTest(a.point, b);
            e ? e.item.data && e.item.data.noHover || (e !== d && f(), void 0 === d && !1 === e.item.selected && (d = pg.item.isBoundsItem(e.item) ? pg.guides.hoverBounds(e.item) : pg.group.isGroupChild(e.item) ? pg.guides.hoverBounds(pg.item.getRootItem(e.item)) : pg.guides.hoverItem(e))) : f()
        },
        clearHoveredItem: f
    }
}();
pg["import"] = function () {
    var d = function (f) {
        new paper.Raster({
            source: f,
            position: paper.view.center
        });
        pg.undo.snapshot("importImage")
    };
    return {
        importAndAddImage: d,
        importAndAddExternalImage: function (f) {
            var b = new XMLHttpRequest;
            b.onload = function () {
                var a = new FileReader;
                a.onloadend = function () {
                    d(a.result)
                };
                a.readAsDataURL(b.response)
            };
            b.open("GET", f);
            b.responseType = "blob";
            b.send()
        },
        importAndAddSVG: function (f) {
            paper.project.importSVG(f, {
                expandShapes: !0
            });
            pg.undo.snapshot("importAndAddSVG");
            paper.project.view.update()
        }
    }
}();
pg.input = function () {
    var d = [],
        f = !1,
        b = function () {
            var k = pg.tools.getToolList();
            jQuery(document).unbind("keydown").bind("keydown", function (h) {
                var t = 0 > d.indexOf(h.keyCode) ? !1 : !0;
                t || (t = h.keyCode, 0 > d.indexOf(t) && d.push(t));
                65 === h.keyCode && h.ctrlKey && (e() || g(h) || h.preventDefault());
                73 === h.keyCode && h.ctrlKey && h.preventDefault();
                71 === h.keyCode && h.ctrlKey && !h.shiftKey && h.preventDefault();
                71 === h.keyCode && h.ctrlKey && h.shiftKey && h.preventDefault();
                97 !== h.keyCode && 49 !== h.keyCode || !h.ctrlKey || h.shiftKey || (h.preventDefault(),
                    pg.view.resetZoom());
                90 === h.keyCode && h.ctrlKey && !h.shiftKey && (h.preventDefault(), pg.undo.undo());
                90 === h.keyCode && h.ctrlKey && h.shiftKey && (h.preventDefault(), pg.undo.redo());
                8 !== h.keyCode || g(h) || h.preventDefault();
                f || (18 === h.keyCode && h.preventDefault(), 27 === h.keyCode && pg.stylebar.blurInputs(), 32 !== h.keyCode || g(h) || (h.preventDefault(), pg.toolbar.switchTool("viewgrab")))
            });
            jQuery(document).unbind("keyup").bind("keyup", function (h) {
                var t = d.indexOf(h.keyCode); - 1 < t && d.splice(t, 1);
                18 === h.keyCode && "viewzoom" ===
                    pg.toolbar.getActiveTool().options.id && pg.toolbar.switchTool(pg.toolbar.getPreviousTool().options.id);
                g(h) || (32 !== h.keyCode || a(h) || (h.preventDefault(), pg.toolbar.switchTool(pg.toolbar.getPreviousTool().options.id)), f || a(h) || (8 !== h.keyCode && 46 !== h.keyCode || pg.selection.deleteSelection(), 88 === h.keyCode && pg.stylebar.switchColors(), jQuery.each(k, function (x, z) {
                    z.usedKeys && z.usedKeys.toolbar && h.keyCode === z.usedKeys.toolbar.toUpperCase().charCodeAt(0) && pg.toolbar.switchTool(z.id)
                })))
            })
        },
        a = function (k) {
            return k.altKey ||
                k.shiftKey || k.ctrlKey || k.ctrlKey && k.altKey ? !0 : !1
        },
        e = function () {
            return window.getSelection().toString() || document.selection && document.selection.createRange().text ? !0 : !1
        },
        g = function (k) {
            k = k.srcElement || k.target;
            return "INPUT" === k.tagName.toUpperCase() && ("TEXT" === k.type.toUpperCase() || "PASSWORD" === k.type.toUpperCase() || "FILE" === k.type.toUpperCase() || "EMAIL" === k.type.toUpperCase() || "SEARCH" === k.type.toUpperCase() || "DATE" === k.type.toUpperCase() || "NUMBER" === k.type.toUpperCase()) || "TEXTAREA" === k.tagName.toUpperCase() ?
                !0 : !1
        },
        c = function () {
            jQuery("body").on("mousedown", function (k) {
                1 === k.which && (f = !0)
            }).on("mouseup", function (k) {
                1 === k.which && (f = !1)
            }).on("contextmenu", function (k) {
                k.preventDefault();
                pg.menu.showContextMenu(k)
            });
            jQuery(window).bind("mousewheel DOMMouseScroll", function (k) {
                k.altKey && ("viewzoom" !== pg.toolbar.getActiveTool().options.id && pg.toolbar.switchTool("viewzoom"), pg.toolbar.getActiveTool() && pg.toolbar.getActiveTool().updateTool(k))
            })
        };
    return {
        isMouseDown: function () {
            return f
        },
        setup: function () {
            b();
            c()
        },
        isModifierKeyDown: a,
        userIsTyping: g,
        textIsSelected: e
    }
}();
pg.item = function () {
    var d = function (b) {
            return "PointText" === b.className || "Shape" === b.className || "PlacedSymbol" === b.className || "Raster" === b.className ? !0 : !1
        },
        f = function (b) {
            return "Layer" == b.parent.className ? b : f(b.parent)
        };
    return {
        isBoundsItem: d,
        isPathItem: function (b) {
            return "Path" === b.className
        },
        isCompoundPathItem: function (b) {
            return "CompoundPath" === b.className
        },
        isGroupItem: function (b) {
            return b && b.className && "Group" === b.className
        },
        isPointTextItem: function (b) {
            return "PointText" === b.className
        },
        isPGTextItem: function (b) {
            return f(b).data.isPGTextItem
        },
        setPivot: function (b, a) {
            d(b) ? b.pivot = b.globalToLocal(a) : b.pivot = a
        },
        getPositionInView: function (b) {
            var a = new paper.Point;
            a.x = b.position.x - paper.view.bounds.x;
            a.y = b.position.y - paper.view.bounds.y;
            return a
        },
        setPositionInView: function (b, a) {
            b.position.x = paper.view.bounds.x + a.x;
            b.position.y = paper.view.bounds.y + a.y
        },
        getRootItem: f
    }
}();
pg.layer = function () {
    pg.svg_nr = 1;
    var d = function (c) {
            return "Layer" === c.className
        },
        f = function () {
            if (!g()) {
                var c = b("pg.internalGuideLayer");
                c.data.isGuideLayer = !0;
                c.bringToFront()
            }
        },
        b = function (c, k, h) {
            c = c || null;
            k = k || !0;
            h = h || null;
            var t = new paper.Layer;
            c ? t.name = c : (pg.svg_nr += 1, t.name = "svg_nr_" + pg.svg_nr);
            k && t.activate();
            h && t.addChildren(h);
            (c = g()) && c.bringToFront();
            return t
        },
        a = function (c) {
            for (var k = 0; k < paper.project.layers.length; k++) {
                var h = paper.project.layers[k];
                if (h.id == c) return h
            }
            return !1
        },
        e = function () {
            for (var c =
                    0; c < paper.project.layers.length; c++) {
                var k = paper.project.layers[c];
                if (k.data && k.data.isDefaultLayer) return k
            }
            return !1
        },
        g = function () {
            for (var c = 0; c < paper.project.layers.length; c++) {
                var k = paper.project.layers[c];
                if (k.data && k.data.isGuideLayer) return k
            }
            return !1
        };
    return {
        setup: function () {
            var c = b("svg_nr_" + pg.svg_nr);
            c.data.isDefaultLayer = !0;
            f();
            c.activate()
        },
        isLayer: d,
        isActiveLayer: function (c) {
            return paper.project.activeLayer == c
        },
        ensureGuideLayer: f,
        addNewLayer: b,
        deleteLayer: function (c) {
            (c = a(c)) && c.remove();
            (c = e()) && c.activate()
        },
        addItemsToLayer: function (c, k) {
            k.addChildren(c)
        },
        addSelectedItemsToActiveLayer: function () {
            var c = pg.selection.getSelectedItems();
            paper.project.activeLayer.addChildren(c)
        },
        getActiveLayer: function () {
            return paper.project.activeLayer
        },
        getLayerByID: a,
        getDefaultLayer: e,
        activateDefaultLayer: function () {
            e().activate()
        },
        getGuideLayer: g,
        getAllUserLayers: function () {
            for (var c = [], k = 0; k < paper.project.layers.length; k++) {
                var h = paper.project.layers[k];
                h.data && h.data.isGuideLayer || c.push(h)
            }
            return c
        },
        changeLayerOrderByIDArray: function (c) {
            c.reverse();
            for (var k = 0; k < c.length; k++) a(c[k]).bringToFront();
            (c = g()) && c.bringToFront()
        },
        deselectAllLayers: function () {
            for (var c = pg.selection.getSelectedItems(), k = 0; k < c.length; k++) {
                var h = c[k];
                d(h) && (h.selected = !1)
            }
            for (k = 0; k < c.length; k++) h = c[k], d(h) || pg.selection.setItemSelection(h, !0)
        }
    }
}();
pg.math = function () {
    var d = function (f, b) {
        return Math.floor(Math.random() * (b - f)) + f
    };
    return {
        checkPointsClose: function (f, b, a) {
            var e = Math.abs(f.y - b.y);
            return Math.abs(f.x - b.x) < a && e < a ? !0 : !1
        },
        getRandomInt: d,
        getRandomBoolean: function () {
            return 1 == d(0, 2) ? !1 : !0
        },
        snapDeltaToAngle: function (f, b) {
            var a = Math.atan2(f.y, f.x);
            a = Math.round(a / b) * b;
            var e = Math.cos(a);
            a = Math.sin(a);
            var g = e * f.x + a * f.y;
            return new paper.Point(e * g, a * g)
        }
    }
}();
pg.menu = function () {
    var d = function () {
            jQuery("#appNav .topMenu>li").off("click").on("click", function (c) {
                c.stopPropagation();
                c = jQuery(this);
                jQuery("#appNav .topMenu>li").not(c).removeClass("active");
                jQuery("#appNav .subMenu").hide();
                c.hasClass("empty") || (c.parent().addClass("active"), c.hasClass("active") ? f() : (c.addClass("active").children("ul").show(), c.find(".subSubMenu").removeClass("active"), jQuery("#menuInputBlocker").show()))
            });
            jQuery("#appNav .subMenu .hasSubSubMenu").off("click").on("click", function (c) {
                c.stopPropagation();
                jQuery(this).children("ul").toggleClass("active")
            });
            jQuery(".subSubMenu>li").on("click", function (c) {
                c.stopPropagation();
                f()
            });
            jQuery("#menuInputBlocker").off("click").on("click", function (c) {
                a()
            })
        },
        f = function () {
            jQuery(".topMenuButton").removeClass("active");
            jQuery(".subMenu").hide();
            jQuery(".subSubMenu").removeClass("active");
            jQuery("#menuInputBlocker").hide()
        },
        b = function () {
            jQuery(".clearDocument_button").click(function () {
                0 < p.number3 ? (p.vidcheck = 0, pg["export"].exportAndPromptSVG()) : alert("Please add frames before playing the animation.")
            });
            jQuery(".resetSettings_button").click(function () {
                confirm("Clear all document and tool settings?") && pg.settings.clearSettings()
            });
            jQuery("#fileUploadSVG").on("change", function (c) {
                pg.helper.processFileInput("text", c.target, function (k) {
                    pg["import"].importAndAddSVG(k)
                })
            });
            jQuery("#fileUploadJSON").on("change", function (c) {
                0 == p.number3 ? pg.helper.processFileInput("text", c.target, function (k) {
                    pg.document.loadJSONDocument(k)
                }) : alert("Please open your animation with empty frames only.")
            });
            jQuery(".undo_button").click(function () {
                pg.undo.undo()
            });
            jQuery(".redo_button").click(function () {
                pg.undo.redo()
            });
            jQuery("#fileUploadImage").on("change", function (c) {
                pg.helper.processFileInput("dataURL", c.target, function (k) {
                    pg["import"].importAndAddImage(k)
                })
            });
            jQuery(".importImageFromURL_button").click(function () {
                var c = prompt("Paste URL to Image (jpg, png, gif)", "http://");
                c && pg["import"].importAndAddExternalImage(c)
            });
            jQuery(".importSVGFromURL_button").click(function () {
                var c = prompt("Paste URL to SVG", "http://");
                c && pg["import"].importAndAddSVG(c)
            });
            jQuery(".exportJSON_button").click(function () {
                0 <
                    p.number3 ? pg.document.saveJSONDocument() : alert("Please add frames before saving.")
            });
            jQuery(".exportSVG_button").click(function () {
                0 < p.number3 ? (p.vidcheck = 1, pg["export"].exportAndPromptSVG()) : alert("Please add frames before exporting a video.")
            });
            jQuery(".exportImage_button").click(function () {
                pg["export"].exportAndPromptImage()
            });
            jQuery(".zoomIn_button").click(function () {
                pg.view.zoomBy(1.25)
            });
            jQuery(".zoomOut_button").click(function () {
                pg.view.zoomBy(.8)
            });
            jQuery(".resetZoom_button").click(function () {
                pg.view.resetZoom()
            });
            jQuery(".resetPan_button").click(function () {
                pg.view.resetPan()
            });
            jQuery(".scriptEditorButton").click(function () {
                pg.codeEditor.toggleVisibility()
            });
            jQuery(".layerPanelButton").click(function () {
                pg.layerPanel.toggleVisibility()
            });
            jQuery(".aboutButton").click(function () {
                g()
            })
        },
        a = function () {
            jQuery("#appNav .topMenu>li").removeClass("active");
            jQuery("#appNav .topMenu").removeClass("active");
            jQuery("#appNav .subMenu").hide();
            jQuery("#menuInputBlocker").hide();
            e()
        },
        e = function () {
            jQuery("body").off("click.contextMenu");
            jQuery("body>#appNavContextMenu").remove();
            jQuery("#menuInputBlocker").hide()
        },
        g = function () {
            new pg.modal.floater("appInfoWindow", "Info", '<h2 class="appTitle">BestSnip Animation</h2><span class="versionNumber"></span><p>A animation maker for your browser.</p>', 300, 100)
        };
    return {
        setup: function () {
            d();
            b()
        },
        setupToolEntries: function (c) {
            var k = jQuery("#toolSubMenu");
            k.empty().parent().removeClass("empty");
            var h = null;
            jQuery.each(c, function (t, x) {
                if ("title" == x.type) {
                    k.append(jQuery('<li class="space"></li>'));
                    var z = jQuery('<li class="hasSubSubMenu">' + x.text + "</li>");
                    h = jQuery('<ul class="subSubMenu">');
                    z.append(h);
                    k.append(z)
                } else "button" == x.type && (z = jQuery('<li class="button' + (x["class"] ? " " + x["class"] : "") + '" data-click="' + x.click + '">' + x.label + "</li>"), z.click(function () {
                    var l = jQuery(this).attr("data-click");
                    pg.helper.executeFunctionByName(l, window);
                    setTimeout(function () {
                        a()
                    }, 100)
                }), void 0 == h ? k.append(z) : h.append(z))
            });
            d()
        },
        clearToolEntries: function () {
            jQuery("#toolSubMenu").empty().parent().addClass("empty")
        },
        showContextMenu: function (c) {
            if (0 < pg.selection.getSelectedItems().length && !(0 < jQuery("#appNavContextMenu").length)) {
                jQuery("body").append("<nav class='appNav' id='appNavContextMenu'></nav>");
                var k = jQuery("#toolSubMenu").clone(!0).appendTo("#appNavContextMenu").show(),
                    h = c.pageY,
                    t = jQuery(document).height() - c.pageY - k.outerHeight();
                0 > t && (h += t - 10);
                k.css({
                    position: "fixed",
                    top: h,
                    left: c.pageX
                });
                jQuery("#menuInputBlocker").show()
            }
        },
        hideContextMenu: e,
        showAboutModal: g
    }
}();
pg.modal = function () {
    return {
        notice: function (d, f) {
            var b = jQuery('<div class="modal fader admin">'),
                a = jQuery('<div class="container ' + f + '">'),
                e = jQuery('<h2 class="modalTitle">Notice</h2>'),
                g = jQuery('<button class="okButton adminButton">Ok</button>');
            "error" === f && e.text("Error");
            var c = jQuery("<p>" + d + "</p>");
            b.append(a);
            a.append(e);
            a.append(c);
            a.append(g);
            b.appendTo(jQuery("body"));
            a.css({
                "margin-top": .5 * -container.outerHeight() + "px"
            });
            g.click(function () {
                b.remove()
            })
        },
        floater: function (d, f, b, a, e) {
            if (!(0 <
                    jQuery("#" + d).length)) {
                var g = jQuery('<div id="' + d + '" class="modal floater">');
                d = jQuery("<header>");
                var c = jQuery('<div class="floaterBody">');
                f = jQuery("<h2>" + f + "</h2>");
                var k = jQuery('<button class="closeButton" title="Close">&times;</button>');
                b = jQuery(b);
                d.append(f, k);
                c.append(b);
                g.append(d, c);
                g.appendTo(jQuery("body"));
                g.draggable({
                    containment: "parent",
                    handle: "header"
                });
                g.css({
                    width: a,
                    left: .5 * jQuery("body").width() - .5 * g.width() + 40,
                    top: e
                });
                k.click(function () {
                    g.remove()
                })
            }
        },
        confirm: function (d, f, b) {
            var a =
                jQuery('<div class="modal fader admin">'),
                e = jQuery('<div class="container confirm">');
            f = jQuery('<h2 class="modalTitle">' + f + "</h2>");
            d = jQuery("<p>" + d + "</p>");
            var g = jQuery('<button class="yesButton adminButton">Yes</button>'),
                c = jQuery('<button class="noButton adminButton">No</button>');
            a.append(e);
            e.append(f);
            e.append(d);
            e.append(g);
            e.append(c);
            a.appendTo(jQuery("body"));
            e.css({
                "margin-top": .5 * -container.outerHeight() + "px"
            });
            g.click(function () {
                b();
                a.remove()
            });
            c.click(function () {
                a.remove()
            })
        },
        form: function (d,
            f, b) {
            var a = jQuery('<div class="modal fader admin">'),
                e = jQuery('<div class="container form">');
            f = jQuery('<h2 class="modalTitle">' + f + "</h2>");
            var g = jQuery(d),
                c = jQuery('<button class="saveButton adminButton">Save</button>'),
                k = jQuery('<button class="cancelButton adminButton">Cancel</button>');
            a.append(e);
            e.append(f);
            e.append(g);
            e.append(c);
            e.append(k);
            a.appendTo(jQuery("body"));
            e.css({
                "margin-top": .5 * -container.outerHeight() + "px"
            });
            c.click(function () {
                b(d);
                a.remove()
            });
            k.click(function () {
                try {
                    resetContentEditingState()
                } catch (h) {}
                a.remove()
            });
            setTimeout(function () {
                e.css({
                    "margin-top": .5 * -container.outerHeight() + "px"
                })
            }, 10)
        }
    }
}();
pg.order = function () {
    return {
        bringSelectionToFront: function () {
            pg.undo.snapshot("bringSelectionToFront");
            for (var d = pg.selection.getSelectedItems(), f = 0; f < d.length; f++) d[f].bringToFront()
        },
        sendSelectionToBack: function () {
            pg.undo.snapshot("sendSelectionToBack");
            for (var d = pg.selection.getSelectedItems(), f = 0; f < d.length; f++) d[f].sendToBack()
        }
    }
}();
pg.selection = function () {
    var d = function () {
            var l = pg.toolbar.getActiveTool();
            if (l) return "detailselect" == l.options.id ? "Segment" : "Item"
        },
        f = function (l, m) {
            if (l.children)
                for (var n = 0; n < l.children.length; n++) {
                    var r = l.children[n];
                    r.children && 0 < r.children.length ? f(r, m) : r.fullySelected = m
                } else
                    for (n = 0; n < l.segments.length; n++) l.segments[n].selected = m
        },
        b = function () {
            "Segment" == d() ? e() : a()
        },
        a = function () {
            for (var l = t(), m = 0; m < l.length; m++) l[m].remove();
            jQuery(document).trigger("DeleteItems");
            jQuery(document).trigger("SelectionChanged");
            paper.project.view.update();
            pg.undo.snapshot("deleteItemSelection")
        },
        e = function () {
            for (var l = t(), m = 0; m < l.length; m++) g(l[m]);
            jQuery(document).trigger("DeleteSegments");
            jQuery(document).trigger("SelectionChanged");
            paper.project.view.update();
            pg.undo.snapshot("deleteSegmentSelection")
        },
        g = function (l) {
            if (l.children)
                for (var m = 0; m < l.children.length; m++) g(l.children[m]);
            else {
                m = l.segments;
                for (var n = 0; n < m.length; n++) {
                    var r = m[n];
                    if (r.selected) {
                        if (l.closed || r.next && !r.next.selected && r.previous && !r.previous.selected) {
                            k(l,
                                n);
                            b();
                            return
                        }
                        l.closed || (r.remove(), n--)
                    }
                }
            }
            0 >= l.segments.length && l.remove()
        },
        c = function () {
            for (var l = t(), m = 0; m < l.length; m++)
                for (var n = l[m], r = n.segments, u = 0; u < r.length; u++) {
                    var v = r[u];
                    if (v.selected && (n.closed || v.next && !v.next.selected && v.previous && !v.previous.selected)) {
                        k(n, u, !0);
                        c();
                        return
                    }
                }
        },
        k = function (l, m, n) {
            for (var r = [], u = 0; u < l.segments.length; u++) {
                var v = l.segments[u];
                !v.selected || n && u === m || r.push(v.point)
            }
            if (m = l.split(m, 0)) {
                for (u = 0; u < m.segments.length; u++)
                    for (v = m.segments[u], n = 0; n < r.length; n++) {
                        var B =
                            r[n];
                        B.x === v.point.x && B.y === v.point.y && (v.selected = !0)
                    }
                if (l !== m)
                    for (u = 0; u < l.segments.length; u++)
                        for (v = l.segments[u], n = 0; n < r.length; n++) B = r[n], B.x === v.point.x && B.y === v.point.y && (v.selected = !0)
            }
        },
        h = function (l, m) {
            var n = pg.group.getItemsGroup(l),
                r = pg.compoundPath.getItemsCompoundPath(l);
            if (n) h(n, m);
            else if (r) h(r, m);
            else {
                if (l.data && l.data.noSelect) return;
                l.fullySelected = !1;
                l.selected = m;
                if (pg.compoundPath.isCompoundPath(l) || pg.group.isGroup(l))
                    if (n = l.children)
                        for (r = 0; r < n.length; r++) n[r].selected = !m
            }
            pg.statusbar.update();
            pg.stylebar.updateFromSelection();
            pg.stylebar.blurInputs();
            jQuery(document).trigger("SelectionChanged")
        },
        t = function () {
            for (var l = paper.project.selectedItems, m = [], n = 0; n < l.length; n++) {
                var r = l[n];
                (pg.group.isGroup(r) && !pg.group.isGroup(r.parent) || !pg.group.isGroup(r.parent)) && r.data && !r.data.isSelectionBound && m.push(r)
            }
            m.sort(function (u, v) {
                return parseFloat(u.index) - parseFloat(v.index)
            });
            return m
        },
        x = function (l, m, n, r, u) {
            for (var v = 0; v < l.children.length; v++) {
                var B = l.children[v];
                if (pg.group.isGroup(B) || pg.item.isCompoundPathItem(B)) x(B,
                    m, n, r, u);
                else if (!z(B, r, m, u)) return !1
            }
            return !0
        },
        z = function (l, m, n, r) {
            if (pg.item.isPathItem(l)) {
                for (var u = !1, v = 0; v < l.segments.length; v++) {
                    var B = l.segments[v];
                    if (n.contains(B.point))
                        if ("detail" === r) B.selected = m.modifiers.shift && B.selected ? !1 : !0, u = !0;
                        else return m.modifiers.shift && l.selected ? h(l, !1) : h(l, !0), !1
                }
                n = l.getIntersections(n);
                if (0 < n.length && !u)
                    if ("detail" === r)
                        for (l = 0; l < n.length; l++) r = n[l].curve, 1 !== l % 2 && (r.selected = m.modifiers.shift ? !r.selected : !0);
                    else return m.modifiers.shift && l.selected ? h(l,
                        !1) : h(l, !0), !1;
                pg.statusbar.update()
            } else if (pg.item.isBoundsItem(l)) {
                a: {
                    r = new paper.Path([l.localToGlobal(l.internalBounds.topLeft), l.localToGlobal(l.internalBounds.topRight), l.localToGlobal(l.internalBounds.bottomRight), l.localToGlobal(l.internalBounds.bottomLeft)]);r.closed = !0;r.guide = !0;
                    for (u = 0; u < r.segments.length; u++)
                        if (n.contains(r.segments[u].point) || 0 === u && 0 < n.getIntersections(r).length) {
                            m.modifiers.shift && l.selected ? h(l, !1) : h(l, !0);
                            r.remove();
                            m = !0;
                            break a
                        } r.remove();m = void 0
                }
                if (m) return !1
            }
            return !0
        };
    return {
        getSelectionMode: d,
        selectAllItems: function () {
            for (var l = pg.document.getAllSelectableItems(), m = 0; m < l.length; m++) h(l[m], !0)
        },
        selectRandomItems: function () {
            for (var l = pg.document.getAllSelectableItems(), m = 0; m < l.length; m++) pg.math.getRandomBoolean() && h(l[m], !0)
        },
        selectAllSegments: function () {
            for (var l = pg.document.getAllSelectableItems(), m = 0; m < l.length; m++) f(l[m], !0)
        },
        clearSelection: function () {
            paper.project.deselectAll();
            pg.stylebar.sanitizeSettings();
            pg.statusbar.update();
            pg.stylebar.blurInputs();
            pg.hover.clearHoveredItem();
            jQuery(document).trigger("SelectionChanged")
        },
        invertItemSelection: function () {
            for (var l = pg.document.getAllSelectableItems(), m = 0; m < l.length; m++) l[m].selected = !l[m].selected;
            jQuery(document).trigger("SelectionChanged")
        },
        invertSegmentSelection: function () {
            for (var l = pg.document.getAllSelectableItems(), m = 0; m < l.length; m++)
                for (var n = l[m], r = 0; r < n.segments.length; r++) {
                    var u = n.segments[r];
                    u.selected = !u.selected
                }
        },
        deleteSelection: b,
        deleteItemSelection: a,
        deleteSegmentSelection: e,
        splitPathAtSelectedSegments: c,
        cloneSelection: function () {
            for (var l = t(), m = 0; m < l.length; m++) {
                var n = l[m];
                n.clone();
                n.selected = !1
            }
            pg.undo.snapshot("cloneSelection")
        },
        setItemSelection: h,
        getSelectedItems: t,
        getSelectionType: function () {
            var l = t();
            if (0 === l.length) return !1;
            for (var m = "", n = "", r = 0; r < l.length; r++) {
                m = l[r];
                if ("Segment" === d()) return "Segment";
                m = m.data.isPGTextItem ? "Text" : m.className;
                if (m == n || "" == n) n = m;
                else return "Mixed"
            }
            return m
        },
        getSelectedPaths: function () {
            for (var l = t(), m = [], n = 0; n < l.length; n++) {
                var r = l[n];
                "Path" === r.className &&
                    m.push(r)
            }
            return m
        },
        switchSelectedHandles: function (l) {
            for (var m = t(), n = 0; n < m.length; n++)
                for (var r = m[n].segments, u = 0; u < r.length; u++) {
                    var v = r[u];
                    v.selected && pg.geometry.switchHandle(v, l)
                }
            pg.undo.snapshot("switchSelectedHandles")
        },
        removeSelectedSegments: function () {
            pg.undo.snapshot("removeSelectedSegments");
            for (var l = t(), m = [], n = 0; n < l.length; n++)
                for (var r = l[n].segments, u = 0; u < r.length; u++) {
                    var v = r[u];
                    v.selected && m.push(v)
                }
            for (n = 0; n < m.length; n++) v = m[n], v.remove()
        },
        processRectangularSelection: function (l, m,
            n) {
            var r = pg.document.getAllSelectableItems(),
                u = 0;
            a: for (; u < r.length; u++) {
                var v = r[u];
                if ("detail" == n && pg.item.isPGTextItem(pg.item.getRootItem(v))) continue a;
                pg.group.isGroup(v) || pg.item.isCompoundPathItem(v) ? x(v, m, v, l, n) : z(v, l, m, n)
            }
        }
    }
}();
pg.statusbar = function () {
    var d = function () {
            jQuery("#zoomSelect").change(function () {
                paper.view.zoom = this.value;
                f();
                this.value = "";
                this.blur()
            })
        },
        f = function () {
            jQuery("#zoomInput").val(Math.round(100 * paper.view.zoom));
            var b = pg.selection.getSelectionType();
            b ? jQuery("#selectionTypeLabel").html(b).removeClass("none") : jQuery("#selectionTypeLabel").html("No selection").addClass("none")
        };
    return {
        setup: function () {
            d()
        },
        update: f
    }
}();
pg.stylebar = function () {
    var d = !0,
        f = function () {
            jQuery("#fillColorInput").spectrum({
                color: null,
                allowEmpty: !0,
                replacerClassName: "fillColorSpec",
                containerClassName: "fillSpecContainer",
                clickoutFiresChange: !0,
                showInput: !0,
                showPalette: !0,
                hideAfterPaletteSelect: !0,
                chooseText: "OK",
                cancelText: "Cancel",
                preferredFormat: "rgb",
                palette: [
                    ["black", "white"]
                ],
                beforeShow: function () {
                    g(!0)
                },
                change: function (q) {
                    jQuery(".fillSpecContainer:visible") && (q = q ? q.toRgbString() : "", u(q), g(!1));
                    d = !1
                },
                hide: function () {
                    g(!1);
                    d = !1
                }
            });
            jQuery(".fillSpecContainer .sp-choose").click(function () {
                u(c());
                g(!1)
            });
            jQuery(".fillColorSpec").attr("title", "Fill color");
            jQuery("#strokeColorInput").spectrum({
                color: "#000",
                allowEmpty: !0,
                replacerClassName: "strokeColorSpec",
                containerClassName: "strokeSpecContainer",
                clickoutFiresChange: !0,
                showInput: !0,
                showPalette: !0,
                hideAfterPaletteSelect: !0,
                chooseText: "OK",
                cancelText: "Cancel",
                preferredFormat: "rgb",
                palette: [
                    ["black", "white"]
                ],
                beforeShow: function () {
                    g(!0)
                },
                change: function (q) {
                    jQuery(".strokeSpecContainer:visible") && (q = q ? q.toRgbString() : "", v(q), g(!1));
                    d = !1
                },
                hide: function () {
                    g(!1);
                    d = !1
                }
            });
            jQuery(".strokeColorSpec").append('<div class="inner"></div>');
            jQuery(".strokeSpecContainer .sp-choose").click(function () {
                v(k());
                g(!1)
            });
            jQuery(".strokeColorSpec").attr("title", "Stroke color");
            jQuery("#colorSwitchButton").click(function () {
                M()
            })
        },
        b = function () {
            jQuery("#opacityInput").on("input change propertychange paste", function () {
                var q = h();
                null !== q && B(q)
            });
            jQuery("#opacitySelect").on("change", function () {
                m(this.value / 100, !0);
                this.value = ""
            })
        },
        a = function () {
            jQuery("#blendModeSelect").on("change",
                function () {
                    N(this.value)
                })
        },
        e = function () {
            jQuery("#strokeInput").on("input change propertychange paste", function () {
                O(this.value);
                paper.view.update()
            }).blur();
            jQuery("#increaseStrokeWidthButton").click(function (q) {
                var y = parseFloat(x()),
                    w = 0;
                q.shiftKey && (w = 10);
                isNaN(y) ? r(1, !0) : r(y + 1 + w, !0)
            });
            jQuery("#decreaseStrokeWidthButton").click(function (q) {
                var y = parseFloat(x()),
                    w = 0;
                q.shiftKey && (w = 10);
                isNaN(y) ? r(1, !0) : 0 > y - (1 + w) ? r(0, !0) : r(y - (1 + w), !0)
            })
        },
        g = function (q) {
            q ? jQuery("#colorInputBlocker").show() : jQuery("#colorInputBlocker").hide()
        },
        c = function () {
            var q = jQuery("#fillColorInput").spectrum("get");
            return q ? q.toRgbString() : null
        },
        k = function () {
            var q = jQuery("#strokeColorInput").spectrum("get");
            return q ? q.toRgbString() : null
        },
        h = function () {
            var q = jQuery("#opacityInput").val();
            return q ? q / 100 : null
        },
        t = function () {
            var q = jQuery("#blendModeSelect").val();
            return q ? q : null
        },
        x = function () {
            var q = jQuery("#strokeInput").val();
            return q ? parseFloat(q) : null
        },
        z = function (q) {
            jQuery("#fillColorInput").spectrum("set", q)
        },
        l = function (q) {
            jQuery("#strokeColorInput").spectrum("set",
                q)
        },
        m = function (q, y) {
            var w = jQuery("#opacityInput");
            null !== q ? w.val(100 * q) : w.val("");
            y ? w.trigger("change").blur() : w.blur()
        },
        n = function (q) {
            var y = jQuery("#blendModeSelect");
            null !== q ? y.val(q) : y.val("")
        },
        r = function (q, y) {
            var w = jQuery("#strokeInput");
            w.val(q);
            y && w.trigger("change").blur()
        },
        u = function (q) {
            for (var y = pg.selection.getSelectedItems(), w = 0; w < y.length; w++) {
                var A = y[w];
                if (pg.item.isPGTextItem(A))
                    for (var D = 0; D < A.children.length; D++)
                        for (var E = A.children[D], F = 0; F < E.children.length; F++) {
                            var C = E.children[F];
                            C.data.isPGGlyphRect || (C.fillColor = q)
                        } else pg.item.isPointTextItem(A) && !q && (q = "rgba(0,0,0,0)"), A.fillColor = q
            }
            pg.undo.snapshot("applyFillColorToSelection")
        },
        v = function (q) {
            for (var y = pg.selection.getSelectedItems(), w = 0; w < y.length; w++) {
                var A = y[w];
                if (pg.item.isPGTextItem(A))
                    for (var D = 0; D < A.children.length; D++)
                        for (var E = A.children[D], F = 0; F < E.children.length; F++) {
                            var C = E.children[F];
                            C.data.isPGGlyphRect || (C.strokeColor = q)
                        } else A.strokeColor = q
            }
            pg.undo.snapshot("applyStrokeColorToSelection")
        },
        B = function (q) {
            for (var y =
                    pg.selection.getSelectedItems(), w = 0; w < y.length; w++) y[w].opacity = q;
            pg.undo.snapshot("setOpacity")
        },
        N = function (q) {
            for (var y = pg.selection.getSelectedItems(), w = 0; w < y.length; w++) y[w].blendMode = q;
            pg.undo.snapshot("setBlendMode")
        },
        O = function (q) {
            for (var y = pg.selection.getSelectedItems(), w = 0; w < y.length; w++) {
                var A = y[w];
                if (pg.group.isGroup(A))
                    for (var D = 0; D < A.children.length; D++) A.children[D].strokeWidth = q;
                else A.strokeWidth = q
            }
            pg.undo.snapshot("setStrokeWidth")
        },
        M = function () {
            d = !1;
            var q = c(),
                y = k(),
                w = c(!0),
                A = k(!0);
            jQuery("#strokeColorInput").spectrum("set", w);
            jQuery("#fillColorInput").spectrum("set", A);
            u(y);
            v(q)
        };
    return {
        setup: function () {
            f();
            b();
            a();
            e()
        },
        getFillColor: c,
        getStrokeColor: k,
        getOpacity: h,
        getBlendMode: t,
        getStrokeWidth: x,
        areColorsDefault: function () {
            return d
        },
        setColorsAreDefault: function (q) {
            d = q
        },
        setFillColor: z,
        setStrokeColor: l,
        setOpacity: m,
        setStrokeWidth: r,
        applyFillColorToSelection: u,
        applyStrokeColorToSelection: v,
        applyOpacityToSelection: B,
        applyBlendModeToSelection: N,
        applyStrokeWidthToSelection: O,
        updateFromSelection: function () {
            for (var q =
                    pg.selection.getSelectedItems(), y = null, w = null, A = null, D = null, E = null, F = 0; F < q.length; F++) {
                var C = q[F],
                    H = null,
                    I = null;
                if (pg.item.isPGTextItem(C))
                    for (var J = C, K = 0; K < C.children.length; K++)
                        for (var P = C.children[K], L = 0; L < P.children.length; L++) {
                            var G = P.children[L];
                            G.data.isPGGlyphRect || (G.fillColor && (H = G.fillColor.toCSS()), G.strokeColor && (I = G.strokeColor.toCSS()), 0 === F && (y = H, w = I, A = J.opacity, D = G.strokeWidth, E = J.blendMode), H !== y && (y = null), I !== w && (w = null), A !== J.opacity && (A = null), E !== J.blendMode && (E = null), D !== G.strokeWidth &&
                                (D = null))
                        } else C.fillColor && (H = pg.item.isPointTextItem(C) && "rgba(0,0,0,0)" === C.fillColor.toCSS() ? null : C.fillColor.toCSS()), C.strokeColor && (I = C.strokeColor.toCSS()), 0 === F && (y = H, w = I, A = C.opacity, D = C.strokeWidth, E = C.blendMode), H !== y && (y = null), I !== w && (w = null), A !== C.opacity && (A = null), E !== C.blendMode && (E = null), D !== C.strokeWidth && (D = null)
            }
            z(y);
            l(w);
            r(D);
            A ? m(A) : m(null);
            E ? n(E) : n(null)
        },
        updateFromItem: function (q) {
            q.fillColor ? z(q.fillColor.toCSS()) : z(null);
            q.strokeColor ? l(q.strokeColor.toCSS()) : l(null);
            r(q.strokeWidth);
            m(q.opacity);
            q.blendMode ? n(q.blendMode) : n(null)
        },
        applyActiveToolbarStyle: function (q) {
            pg.group.isGroup(q) ? q.opacity = h() : (q.fillColor = c(), q.strokeColor = k(), q.opacity = h(), q.strokeWidth = x());
            q.blendMode = t();
            return q
        },
        switchColors: M,
        sanitizeSettings: function () {
            "" === jQuery("#opacityInput").val() && m(1);
            "" === jQuery("#blendModeSelect").val() && n("normal");
            c() || k() || z("rgb(0,0,0)");
            null === x() && r(1)
        },
        blurInputs: function () {
            jQuery("input, select, textarea, button").blur()
        }
    }
}();
pg.toolbar = function () {
    var d, f, b = function () {
            var c = pg.tools.getToolList(),
                k = jQuery(".toolsContainer");
            jQuery.each(c, function (h, t) {
                if ("hidden" == t.type) return !0;
                var x = "";
                t.usedKeys && "" != t.usedKeys.toolbar && (x = " (" + t.usedKeys.toolbar.toUpperCase() + ")");
                x = jQuery('<div class="tool_' + t.id + ' tool" data-id="' + t.id + '" title="' + t.name + x + '">');
                x.css({
                    "background-image": "url(paper/assets/tools/tool_" + t.id + ".svg)"
                });
                x.click(function () {
                    a(t.id)
                });
                k.append(x);
                "cloud" == t.id && (document.getElementById("loadingscreenfull").className =
                    "dnone2", setTimeout(function () {
                        document.getElementById("loadingscreenfull").className = "dnone1"
                    }, 1E3))
            });
            pg.statusbar.update();
            setTimeout(function () {
                0 < paper.tools.length && paper.tools[0].remove();
                g()
            }, 300)
        },
        a = function (c, k) {
            try {
                var h = pg.tools.getToolInfoByID(c),
                    t = new pg.tools[c];
                jQuery.each(h, function (x, z) {
                    t.options[x] = z
                });
                if (!d || d.options.id !== t.options.id || k) d && "hidden" !== d.options.type && (f = d), e(), pg.stylebar.sanitizeSettings(), t.activateTool(), d = t, jQuery(".tool_" + c).addClass("active")
            } catch (x) {
                console.warn('The tool with the id "' +
                    c + '" could not be loaded.', x)
            }
        },
        e = function () {
            if (void 0 !== d && null !== d) {
                try {
                    d.deactivateTool()
                } catch (k) {}
                for (var c = 0; c < paper.tools.length; c++) paper.tools[c].remove()
            }
            jQuery(".toolOptionPanel").remove();
            jQuery(".tool").removeClass("active")
        },
        g = function () {
            a("select")
        };
    return {
        setup: function () {
            b()
        },
        getActiveTool: function () {
            return d
        },
        getPreviousTool: function () {
            return f
        },
        switchTool: a,
        resetTools: e,
        setDefaultTool: g
    }
}();
pg.toolOptionPanel = function () {
    return {
        setup: function (d, f, b) {
            function a() {
                jQuery.each(f, function (h, t) {
                    t.requirements && jQuery.each(t.requirements, function (x, z) {
                        var l = jQuery('.option-section[data-id="' + h + '"]');
                        d[x] == z ? l.removeClass("hidden") : l.addClass("hidden")
                    })
                })
            }
            var e = jQuery('<div class="toolOptionPanel">'),
                g = jQuery('<h3 class="panelTitle">' + d.name + "</h3>"),
                c = jQuery('<div class="options">');
            jQuery.each(f, function (h, t) {
                var x = jQuery('<div class="option-section" data-id="' + h + '">'),
                    z = jQuery('<label for="' +
                        h + '">' + t.label + "</label>");
                if ("boolean" == t.type) {
                    var l = jQuery('<input type="checkbox" name="' + h + '">');
                    d[h] && l.attr("checked", !0)
                } else if ("int" == t.type || "float" == t.type) {
                    var m = "";
                    void 0 != t.min && "int" == t.type ? m = ' min="' + parseInt(t.min) + '"' : void 0 != t.min && "float" == t.type && (m = ' min="' + parseFloat(t.min) + '"');
                    l = jQuery('<input type="number" data-type="' + t.type + '" name="' + h + '" value="' + d[h] + '"' + m + ">")
                } else if ("list" == t.type) l = jQuery('<select data-type="' + t.type + '" name="' + h + '">'), jQuery.each(t.options, function (u,
                    v) {
                    var B = jQuery('<option value="' + v + '">' + v + "</option>");
                    v == d[h] && B.attr("selected", !0);
                    t.maxWidth && l.css({
                        maxWidth: t.maxWidth + "px"
                    });
                    l.append(B)
                });
                else if ("text" == t.type) l = jQuery('<input type="text" id="textToolInput" data-type="' + t.type + '" name="' + h + '" value="">');
                else if ("button" == t.type) var n = jQuery('<button data-click="' + t.click + '">' + t.label + "</button>");
                else if ("title" == t.type) {
                    var r = jQuery("<h4>" + t.text + "</h4>");
                    x.addClass("titleSection")
                }
                if (l) l.on("keyup blur change mousewheel", function (u) {
                    if ("checkbox" ==
                        u.target.type) var v = u.target.checked;
                    else if ("number" == u.target.type) {
                        var B = u.target.dataset.type;
                        "int" == B ? (v = parseInt(u.target.value), u = parseInt(jQuery(this).attr("min")), jQuery.isNumeric(v)) ? void 0 != u && u > v && (v = u, jQuery(this).val(u)) : v = u : "float" == B && (v = parseFloat(u.target.value), u = parseFloat(jQuery(this).attr("min")), jQuery.isNumeric(v) || (v = u), void 0 != u && u > v && (v = u, jQuery(this).val(u)))
                    } else "select-one" == u.target.type && (v = u.target.value);
                    d[h] = v;
                    pg.tools.setLocalOptions(d);
                    a();
                    b()
                });
                n && n.click(function () {
                    var u =
                        jQuery(this).attr("data-click");
                    pg.helper.executeFunctionByName(u, window)
                });
                r && x.append(r);
                l ? x.append(z, l) : n && x.append(n);
                c.append(x)
            });
            var k = $('<button class="toolOptionResetButton" title="Reset Tool Settings">R</button>').click(function () {
                confirm("Reset tool options to default?") && (pg.tools.deleteLocalOptions(d.id), pg.toolbar.switchTool(d.id, !0))
            });
            g.append(k);
            e.append(g, c);
            jQuery("body").append(e);
            e.css({
                "min-width": g.outerWidth() + 30 + "px"
            });
            e.draggable({
                containment: "#paperCanvas",
                handle: ".panelTitle"
            });
            a();
            return e
        },
        update: function (d) {
            jQuery.each(d, function (f, b) {
                var a = jQuery('[name="' + f + '"]');
                "int" == a.attr("data-type") ? a.val(parseInt(b)) : "float" == a.attr("data-type") ? a.val(parseFloat(b)) : "text" == a.attr("data-type") ? a.val(b) : "list" == a.attr("data-type") && a.val(b)
            })
        }
    }
}();
pg.tools = function () {
    var d = [];
    return {
        registerTool: function (f) {
            d.push(f)
        },
        getToolList: function () {
            return d
        },
        getToolInfoByID: function (f) {
            for (var b = 0; b < d.length; b++)
                if (d[b].id == f) return d[b]
        },
        getLocalOptions: function (f) {
            var b = localStorage.getItem("pg.tools." + f.id);
            if (b && 0 < b.length) {
                b = JSON.parse(b);
                for (var a in f) b.hasOwnProperty(a) && (f[a] = b[a])
            }
            return f
        },
        setLocalOptions: function (f) {
            var b = JSON.stringify(f, null, 2);
            localStorage.setItem("pg.tools." + f.id, b)
        },
        deleteLocalOptions: function (f) {
            localStorage.removeItem("pg.tools." +
                f)
        }
    }
}();
pg.undo = function () {
    var d = [],
        f = -1,
        b = function (a) {
            paper.project.clear();
            paper.project.importJSON(a.json);
            pg.layer.deselectAllLayers();
            paper.view.update()
        };
    return {
        setup: function () {
            pg.undo.snapshot("init")
        },
        snapshot: function (a) {
            a = {
                type: a,
                json: paper.project.exportJSON({
                    asString: !1
                })
            };
            f < d.length - 1 && (d = d.slice(0, f + 1));
            d.push(a);
            80 < d.length && d.shift();
            f = d.length - 1
        },
        undo: function () {
            0 < f && (f--, b(d[f]), jQuery(document).trigger("Undo"))
        },
        redo: function () {
            f < d.length - 1 && (f++, b(d[f]), jQuery(document).trigger("Redo"))
        },
        removeLastState: function () {
            d.splice(-1,
                1)
        },
        clear: function () {
            d = [];
            f = -1
        },
        getStates: function () {
            return d
        },
        getHead: function () {
            return f
        }
    }
}();
pg.view = function () {
    return {
        zoomBy: function (d) {
            paper.view.zoom *= d;
            .01 >= paper.view.zoom ? paper.view.zoom = .01 : 1E3 <= paper.view.zoom && (paper.view.zoom = 1E3);
            pg.statusbar.update()
        },
        resetZoom: function () {
            paper.view.zoom = 1;
            pg.statusbar.update()
        },
        resetPan: function () {
            paper.view.center = pg.document.getCenter()
        }
    }
}();
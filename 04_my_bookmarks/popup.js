
function dumpBookmarks(query) {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
        const bookmark = document.querySelector("#bookmarks")
        bookmark.appendChild(dumpTreeNodes(bookmarkTreeNodes, query));
    });
}

function dumpTreeNodes(bookmarkNodes, query) {
    let list = document.createElement("ul");
    for(var i = 0; i < bookmarkNodes.length; i++) {
        list.appendChild(dumpNode(bookmarkNodes[i], query))
    }
    return list;
}

function dumpNode(bookmarkNode, query) {
    if (bookmarkNode.title) {
        if (query && !bookmarkNode.children) {
            if (String(bookmarkNode.title.toLowerCase()).indexOf(query.toLowerCase()) === -1) {
                return document.createElement('span');
            }
        }

        let anchor = document.createElement('a');
        anchor.href = bookmarkNode.url;
        anchor.text = bookmarkNode.title;

        /*
         * When clicking on a bookmark in the extension, a new tab is fired with
         * the bookmark url.
         */
        anchor.onclick = function () {
            chrome.tabs.create({ url: bookmarkNode.url });
        };

        var span = document.createElement('span');
        span.appendChild(anchor)
    }

    var li = document.createElement(bookmarkNode.title ? 'li' : 'div');
    if(span) {
        li.appendChild(span)
    }
    if (bookmarkNode.children && bookmarkNode.children.length > 0) {
        li.appendChild(dumpTreeNodes(bookmarkNode.children, query));
    }

    return li;
}


document.addEventListener("DOMContentLoaded", function() {
    dumpBookmarks();
});
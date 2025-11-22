const allDropboxes = document.getElementsByClassName("dropbox")
let resetDropBoxes = false

for (let dropboxAssignedId = 0; dropboxAssignedId < allDropboxes.length; dropboxAssignedId++) {
    let dropbox = allDropboxes[dropboxAssignedId]
    dropbox.setAttribute("id", "dropbox-id-" + dropboxAssignedId.toString()) // dropbox-visible="false"
    dropbox.setAttribute("dropbox-visible", "false")
    dropbox.addEventListener("click", function() { displayDropBox("dropbox-id-" + dropboxAssignedId.toString()) })
}

function displayDropBox(id) {
    resetDropBoxes = true
    let dropbox = document.getElementById(id)
    let visibleDropbox = (dropbox.getAttribute("dropbox-visible") === "true")
    let allAvailableDropbox = document.getElementsByClassName("dropbox-list")
    while (allAvailableDropbox.length > 0)
    {
        allAvailableDropbox[0].remove()
    }
    resetDropBoxes = false
    dropbox.setAttribute("dropbox-visible", "false")
    if (visibleDropbox) return
    dropbox.setAttribute("dropbox-visible", "true")

    let dropboxList = document.createElement("div")
    dropboxList.setAttribute("class", "dropbox-list")
    let dropboxListItems = dropbox.getAttribute("dropbox-value").split("||")
    dropboxListItems.forEach(item => {
        let dropboxListItem = document.createElement("button")
        dropboxListItem.setAttribute("class", "dropbox-list-item")
        dropboxListItem.innerText = item
        dropboxList.appendChild(dropboxListItem)
        dropboxListItem.addEventListener("click", function() {
            let dropboxId = id
            let dropboxElement = document.getElementById(dropboxId)
            // TODO: Fix this not working, supposed to maintain width size if not as wide
            let dropboxPrevSize = dropbox.getBoundingClientRect()
            dropboxElement.innerText = dropboxListItem.innerText
            let dropboxNewSize = dropbox.getBoundingClientRect()
            if (dropboxPrevSize.width > dropboxNewSize.width) {
                dropboxElement.style.width = dropboxPrevSize.width
            }
            displayDropBox(dropboxId)
        })
    })
    document.body.appendChild(dropboxList)
    if (window.getComputedStyle(dropboxList).visibility === "hidden") {
        console.log("heya!")
        let dropboxSize = dropbox.getBoundingClientRect()
        dropboxList.style.visibility = "visible"
        dropboxList.style.width = dropboxSize.width.toString() + "px"
        function initPos()
        {
            let dropboxSize = dropbox.getBoundingClientRect();
            dropboxList.style.left = dropboxSize.x.toString() + "px"
            dropboxList.style.top = (dropboxSize.y + dropboxSize.height).toString() + "px"
        }
        initPos();
        window.onresize = initPos;
    }
}
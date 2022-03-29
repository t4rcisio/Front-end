import xterm from "xterm"


async function getTerminal(){
        const  term = new xterm.Terminal();
        term.open(document.getElementById('terminal'));
        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
}

async function buildHistory() {
    const historyMap = localStorage.getItem("git-history")

    const list = document.getElementById("git_list_recents")
    let data = `<li class="list-group-item" style="border: 0px;">
                        <div style="text-align: center;"><a
                                style="font-size: 20px; font-weight: lighter;">Recents</a>
                        </div>
                    </li>`
    const dict = await JSON.parse(historyMap)
    const cardList = await Object.entries(dict)

    cardList.forEach((element) => {
        data += `<li class="list-group-item" style="border: 0px;">
                        <img src="${element[1].pic}" width="50px"/>
                        <div style="text-align: center;")>
                            <a href="javascript:autoLoad('${element[1].nick}')" class="card-link">${element[1].nick}</a>
                        </div>
                        </li>`
    })

    list.innerHTML = data
}

async function recentsCache(user) {
    let historyMap = localStorage.getItem("git-history")

    if (!historyMap)
        localStorage.setItem("git-history", ` {}`)

    historyMap = localStorage.getItem("git-history")
    const dict = JSON.parse(historyMap)
    dict[`${user.login}`] = {
        "nick": user.login,
        "name": user.name || user.login,
        "pic": user.avatar_url,
        "url": user.html_url
    }

    localStorage.setItem("git-history", JSON.stringify(dict))
    await buildHistory()
}


async function getRep(user) {
    const data = await fetch(`https://api.github.com/users/${user}/repos`)
    const repos = await data.json()
    await buildRepos(repos)
}

async function buildRepos(repos) {
    const list = document.getElementById("git_list_repos")
    let content = ""
    repos.forEach((element) => {
        content += `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold " style="text-align: start;">
                <a href="${element.html_url}" class="text-decoration-none" >${element.name}</a>
                </div>
                <div style="text-align: left; font-size: 12px"> ${element.description || "\n "} </div>
                </div>
            <span class="badge bg-primary rounded-pill">🌟 ${element.stargazers_count}</span>
        </li>`
    })

    list.innerHTML = content

}


async function formatData(user) {

    const git_pic = document.getElementById("git_pic")
    const git_name = document.getElementById("git_name")
    const git_login = document.getElementById("git_login")
    const git_bio = document.getElementById("git_bio")
    const git_followers = document.getElementById("git_followers")
    const git_following = document.getElementById("git_following")
    const git_repos = document.getElementById("git_repos")
    const git_location = document.getElementById("git_location")

    git_pic.src = user.avatar_url || "https://avatars.githubusercontent.com/u/9919?v=4"
    git_name.textContent = user.name || " "
    git_login.textContent = "@" + user.login
    git_login.href = user.html_url
    git_bio.textContent = user.bio || " "
    git_followers.textContent = user.followers
    git_following.textContent = user.following
    git_repos.textContent = user.public_repos
    git_location.textContent = user.location

    window.scrollTo(0, 0)
}

async function gitAPI(nickname) {
    const data = await fetch(`https://api.github.com/users/${nickname}`)
    const user = await data.json()
    await formatData(user)
    await recentsCache(user)
    await getTerminal()
}

async function getUser() {
    const search_form = document.getElementById("git_input_nick")
    const nickname = search_form.value.trim()

    if (nickname != "") {
        await gitAPI(nickname)
        await getRep(nickname)
    }
}

async function autoLoad(nickname) {
    await gitAPI(nickname)
    await getRep(nickname)
}
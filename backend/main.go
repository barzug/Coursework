package main

import (
	"./daemon"

	"log"

	h "./handlers"

	"./router"

	"github.com/valyala/fasthttp"
)

const port = ":3001"

func addRoutes(r *router.Routing) {
	r.AddRoute(&router.Route{Method: "POST", Path: "/api/forum/create", Function: h.CreateForum})

	r.AddRoute(&router.Route{Method: "GET", Path: "/api/forum/<slug>/details", Function: h.GetOneForum})
	r.AddRoute(&router.Route{Method: "POST", Path: "/api/forum/<slug>/details", Function: h.UpdateForum})

	r.AddRoute(&router.Route{Method: "POST", Path: "/api/forum/<slug>/create", Function: h.CreateThread})
	r.AddRoute(&router.Route{Method: "GET", Path: "/api/forum/<slug>/threads", Function: h.GetThreads})

	r.AddRoute(&router.Route{Method: "GET", Path: "/api/thread/<slug>/details", Function: h.GetOneThread})
	r.AddRoute(&router.Route{Method: "POST", Path: "/api/thread/<slug>/details", Function: h.UpdateThread})

	r.AddRoute(&router.Route{Method: "POST", Path: "/api/user/<nickname>/create", Function: h.CreateUser})
	r.AddRoute(&router.Route{Method: "GET", Path: "/api/user/<nickname>/profile", Function: h.GetUser})
	r.AddRoute(&router.Route{Method: "GET", Path: "/api/user/<nickname>/forums", Function: h.GetForums})

	r.AddRoute(&router.Route{Method: "POST", Path: "/api/service/clear", Function: h.ClearDB})
}

func main() {

	log.Printf("Server started")

	err := daemon.Init("localhost", "postgres", "docker", "docker", 50)
	if err != nil {
		log.Fatal(err)
	}

	r := new(router.Routing)

	addRoutes(r)

	err = r.Init()
	if err != nil {
		log.Fatal(err)
	}

	log.Fatal(fasthttp.ListenAndServe(port, r.Router.HandleRequest))
}

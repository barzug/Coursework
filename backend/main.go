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
	r.AddRoute(router.NewRoute("POST", "/api/forum/create", h.CreateForum))

	r.AddRoute(router.NewRoute("GET", "/api/forum/<slug>/details", h.GetOneForum))
	r.AddRoute(router.NewRoute("POST", "/api/forum/<slug>/details", h.UpdateForum))

	r.AddRoute(router.NewRoute("POST", "/api/forum/<slug>/create", h.CreateThread))
	r.AddRoute(router.NewRoute("GET", "/api/forum/<slug>/threads", h.GetThreads))

	r.AddRoute(router.NewRoute("GET", "/api/thread/<slug>/details", h.GetOneThread))
	r.AddRoute(router.NewRoute("POST", "/api/thread/<slug>/details", h.UpdateThread))

	r.AddRoute(router.NewRoute("POST", "/api/user/<nickname>/create", h.CreateUser))
	r.AddRoute(router.NewRoute("GET", "/api/user/<nickname>/profile", h.GetUser))
	r.AddRoute(router.NewRoute("GET", "/api/user/<nickname>/forums", h.GetForums))

	r.AddRoute(router.NewRoute("POST", "/api/service/clear", h.ClearDB))
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

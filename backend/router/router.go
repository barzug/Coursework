package router

import (
	"errors"

	"github.com/qiangxue/fasthttp-routing"
)

type Route struct {
	method   string
	path     string
	function func(context *routing.Context) error
}

func NewRoute(method, path string, function func(context *routing.Context) error) *Route {
	r := new(Route)
	r.method = method
	r.path = path
	r.function = function
	return r
}

type Routing struct {
	routes []Route
	Router *routing.Router
}

func (r *Routing) AddRoute(route *Route) {
	r.routes = append(r.routes, *route)
}

func (r *Routing) Init() error {
	r.Router = routing.New()
	for _, route := range r.routes {
		switch route.method {
		case "POST":
			r.Router.Post(route.path, route.function)
		case "GET":
			r.Router.Get(route.path, route.function)
		default:
			return errors.New("Api doesn't support this method!")
		}

		r.Router.Options(route.path, func(c *routing.Context) error {
			c.Response.Header.Set("Access-Control-Allow-Origin", "http://localhost:3000")
			c.Response.Header.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
			c.Response.Header.Set("Access-Control-Allow-Headers", "*")
			return nil
		})
	}
	return nil
}

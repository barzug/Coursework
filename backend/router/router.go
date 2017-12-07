package router

import (
	"errors"

	"github.com/qiangxue/fasthttp-routing"
)

type Route struct {
	Method   string
	Path     string
	Function func(context *routing.Context) error
}

type Routing struct {
	Routes []Route
	Router *routing.Router
}

func (r *Routing) AddRoute(route *Route) {
	r.Routes = append(r.Routes, *route)
}

func (r *Routing) Init() error {
	r.Router = routing.New()
	for _, route := range r.Routes {
		switch route.Method {
		case "POST":
			r.Router.Post(route.Path, route.Function)
		case "GET":
			r.Router.Get(route.Path, route.Function)
		default:
			return errors.New("Api doesn't support this method!")
		}

		r.Router.Options(route.Path, func(c *routing.Context) error {
			c.Response.Header.Set("Access-Control-Allow-Origin", "*")
			c.Response.Header.Set("Access-Control-Allow-Headers", "Content-Type")
			return nil
		})
	}
	return nil
}

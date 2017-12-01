package handlers

import (
	"../daemon"
	"github.com/qiangxue/fasthttp-routing"
)

func ClearDB(c *routing.Context) error {
	return daemon.DB.InitSchema()
}

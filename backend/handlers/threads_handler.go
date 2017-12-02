package handlers

import (
	"../daemon"
	"../database/models"
	"../utils"

	"encoding/json"

	"github.com/qiangxue/fasthttp-routing"
	"github.com/valyala/fasthttp"
)

func GetOneThread(c *routing.Context) error {
	thread := models.Threads{}
	var err error
	thread.Slug = c.Param("slug")
	err = thread.GetThreadBySlug(daemon.DB.Pool)

	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusOK, thread)
	return nil
}

func UpdateThread(c *routing.Context) error {
	thread := new(models.Threads)
	if err := json.Unmarshal(c.PostBody(), thread); err != nil {
		return err
	}
	prevThread := models.Threads{}
	prevThread.Slug = c.Param("slug")
	thread.Slug = c.Param("slug")

	err := prevThread.GetThreadBySlug(daemon.DB.Pool)

	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	if utils.CheckEmpty(thread) {
		utils.AdditionObject(thread, &prevThread)
	}

	if err := thread.UpdateThread(daemon.DB.Pool); err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusBadRequest, nil)
		return nil
	}

	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusOK, thread)
	return nil
}

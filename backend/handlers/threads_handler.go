package handlers

import (
	"../daemon"
	"../database/models"
	"../utils"

	"encoding/json"

	"github.com/qiangxue/fasthttp-routing"
	"github.com/valyala/fasthttp"

	"strconv"
)

func GetOneThread(c *routing.Context) error {
	slugOrId := c.Param("slug_or_id")

	thread := models.Threads{}
	var err error
	if id, parseErr := strconv.ParseInt(slugOrId, 10, 64); parseErr == nil {
		thread.TID = id
		err = thread.GetThreadById(daemon.DB.Pool)
	} else {
		thread.Slug = slugOrId
		err = thread.GetThreadBySlug(daemon.DB.Pool)
	}
	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusOK, thread)
	return nil
}

func UpdateThread(c *routing.Context) error {
	slugOrId := c.Param("slug_or_id")

	thread := new(models.Threads)
	if err := json.Unmarshal(c.PostBody(), thread); err != nil {
		return err
	}

	prevThread := models.Threads{}
	var err error
	if id, parseErr := strconv.ParseInt(slugOrId, 10, 64); parseErr == nil {
		prevThread.TID = id
		err = prevThread.GetThreadById(daemon.DB.Pool)
	} else {
		prevThread.Slug = slugOrId
		err = prevThread.GetThreadBySlug(daemon.DB.Pool)
	}
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

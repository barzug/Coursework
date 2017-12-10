package handlers

import (
	"fmt"
	"log"

	"../daemon"
	"../database/models"
	"../utils"

	"encoding/json"

	"github.com/qiangxue/fasthttp-routing"
	"github.com/valyala/fasthttp"
)

func CreateForum(c *routing.Context) error {
	forum := new(models.Forums)
	if err := json.Unmarshal(c.PostBody(), forum); err != nil {
		fmt.Print(err)
		return err
	}

	author := models.Users{Nickname: forum.Author}

	forumAuthor, err := author.GetUserByLogin(daemon.DB.Pool)
	if err != nil {
		fmt.Print(err)
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	forum.Author = forumAuthor.Nickname

	log.Print(forum)

	if err := forum.CreateForum(daemon.DB.Pool); err != nil {
		if err == utils.UniqueError {
			prevForum, err := forum.GetForumBySlug(daemon.DB.Pool)

			if err != nil {
				daemon.Render.JSON(c.RequestCtx, fasthttp.StatusBadRequest, nil)
				return err
			}

			daemon.Render.JSON(c.RequestCtx, fasthttp.StatusConflict, prevForum)
			return nil
		}
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusBadRequest, nil)
		return nil
	}

	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusCreated, forum)

	c.Response.Header.Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Response.Header.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	c.Response.Header.Set("Access-Control-Allow-Headers", "*")

	return nil
}

func GetOneForum(c *routing.Context) error {
	c.Response.Header.Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Response.Header.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	c.Response.Header.Set("Access-Control-Allow-Headers", "*")

	slug := c.Param("slug")
	forum := new(models.Forums)
	forum.Slug = slug

	resultForum, err := forum.GetForumBySlug(daemon.DB.Pool)
	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusOK, resultForum)
	return nil
}

func UpdateForum(c *routing.Context) error {
	slug := c.Param("slug")
	forum := new(models.Forums)
	if err := json.Unmarshal(c.PostBody(), forum); err != nil {
		return err
	}
	forum.Slug = slug

	if utils.CheckEmpty(forum) {
		prevForum, err := forum.GetForumBySlug(daemon.DB.Pool)
		if err != nil {
			daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
			return nil
		}
		utils.AdditionObject(forum, &prevForum)
	}

	err := forum.UpdateForum(daemon.DB.Pool)
	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusOK, forum)
	return nil
}

func CreateThread(c *routing.Context) error {
	c.Response.Header.Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Response.Header.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	c.Response.Header.Set("Access-Control-Allow-Headers", "*")

	slug := c.Param("slug")
	thread := new(models.Threads)
	if err := json.Unmarshal(c.PostBody(), thread); err != nil {
		return err
	}

	var forumSlug string
	var errForum error

	forum := models.Forums{Slug: slug}
	forum, errForum = forum.GetForumBySlug(daemon.DB.Pool)
	forumSlug = forum.Slug

	if errForum != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	thread.Forum = forumSlug

	log.Print(thread)

	if err := thread.CreateThread(daemon.DB.Pool); err != nil {
		if err == utils.UniqueError {
			err := thread.GetThreadBySlug(daemon.DB.Pool)

			if err != nil {
				daemon.Render.JSON(c.RequestCtx, fasthttp.StatusBadRequest, nil)
				log.Print(err)
				return err
			}

			daemon.Render.JSON(c.RequestCtx, fasthttp.StatusConflict, thread)
			return nil
		}
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusBadRequest, nil)
		log.Print(err)
		return nil
	}
	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusCreated, thread)
	return nil
}

func GetThreads(c *routing.Context) error {
	c.Response.Header.Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Response.Header.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	c.Response.Header.Set("Access-Control-Allow-Headers", "*")

	slug := c.Param("slug")
	forum := new(models.Forums)
	forum.Slug = slug

	resultForum, err := forum.GetForumBySlug(daemon.DB.Pool)
	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	var threads []models.Threads
	threads, err = resultForum.GetThreadsByForum(daemon.DB.Pool)
	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusBadRequest, nil)
	}
	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusOK, threads)
	return nil
}

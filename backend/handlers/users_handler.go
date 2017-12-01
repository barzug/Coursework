package handlers

import (
	"../daemon"
	"../database/models"
	"../utils"

	"encoding/json"

	"github.com/qiangxue/fasthttp-routing"
	"github.com/valyala/fasthttp"
)

func CreateUser(c *routing.Context) error {
	nickname := c.Param("nickname")
	user := new(models.Users)
	if err := json.Unmarshal(c.PostBody(), user); err != nil {
		return err
	}
	user.Nickname = nickname

	if err := user.CreateUser(daemon.DB.Pool); err != nil {
		if err == utils.UniqueError {
			users, err := user.GetUserByLoginAndEmail(daemon.DB.Pool)

			if err != nil {
				daemon.Render.JSON(c.RequestCtx, fasthttp.StatusBadRequest, nil)
				return err
			}

			daemon.Render.JSON(c.RequestCtx, fasthttp.StatusConflict, users)
			return nil
		}
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusBadRequest, nil)
		return nil
	}

	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusCreated, user)
	return nil
}

func GetUser(c *routing.Context) error {
	nickname := c.Param("nickname")
	user := new(models.Users)
	user.Nickname = nickname

	resultUser, err := user.GetUserByLogin(daemon.DB.Pool)
	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusOK, resultUser)
	return nil
}

func GetForums(c *routing.Context) error {
	nickname := c.Param("nickname")
	user := new(models.Users)
	user.Nickname = nickname

	forumAuthor, err := user.GetUserByLogin(daemon.DB.Pool)
	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	var forums []models.Forums
	forums, err = forumAuthor.GetForumsByUser(daemon.DB.Pool)

	if err != nil {
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusBadRequest, nil)
	}
	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusOK, forums)
	return nil
}

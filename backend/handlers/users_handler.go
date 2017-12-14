package handlers

import (
	"log"

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
	// выставляем заголовки, необходимые для кросс-доменного взаимодействия
	c.Response.Header.Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Response.Header.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	c.Response.Header.Set("Access-Control-Allow-Headers", "*")

	// получаем параметр из маршрута
	nickname := c.Param("nickname")

	// создаем пользователя
	user := new(models.Users)
	user.Nickname = nickname

	// проверяем существует ли такой пользователь
	forumAuthor, err := user.GetUserByLogin(daemon.DB.Pool)
	if err != nil {
		log.Print(err)
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
		return nil
	}

	var forums []models.Forums
	forums, err = forumAuthor.GetForumsByUser(daemon.DB.Pool)

	if err != nil {
		log.Print(err)
		daemon.Render.JSON(c.RequestCtx, fasthttp.StatusNotFound, nil)
	}
	daemon.Render.JSON(c.RequestCtx, fasthttp.StatusOK, forums)

	return nil
}

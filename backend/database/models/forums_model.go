package models

import (
	"time"

	"github.com/jackc/pgx"

	"../../utils"
)

type Forums struct {
	Slug          string    `json:"slug"`
	Threads       int32     `json:"threads"`
	Title         string    `json:"title"`
	VoteType      int32     `json:"vote_type"`
	DeleteMessage bool      `json:"delete_message"`
	Created       time.Time `json:"created"`
	Author        string    `json:"user"`
}

func (forum *Forums) CreateForum(pool *pgx.ConnPool) error {
	var slug string
	err := pool.QueryRow(`INSERT INTO forums(slug, title, author, vote_type, delete_message)`+
		`VALUES ($1, $2, $3, $4, $5) RETURNING slug;`,
		forum.Slug, forum.Title, forum.Author, forum.VoteType, forum.DeleteMessage).Scan(&slug)
	if err != nil {
		if pgerr, ok := err.(pgx.PgError); ok {
			if pgerr.ConstraintName == "index_on_forums_slug" {
				return utils.UniqueError
			} else {
				return err
			}
		}
		return err
	}
	return nil
}

func (forum *Forums) UpdateForum(pool *pgx.ConnPool) error {
	var slug string
	err := pool.QueryRow(`UPDATE forums SET title = $1, vote_type = $2, delete_message = $3`+
		`WHERE slug = $4 RETURNING slug;`,
		forum.Title, forum.VoteType, forum.DeleteMessage, forum.Slug).Scan(&slug)
	if err != nil {
		return err
	}
	return nil
}

func (forum *Forums) GetForumBySlug(pool *pgx.ConnPool) (Forums, error) {
	resultForum := Forums{}
	err := pool.QueryRow(`SELECT slug, title, author, threads, vote_type, delete_message, created FROM forums WHERE slug = $1`,
		forum.Slug).Scan(&resultForum.Slug, &resultForum.Title, &resultForum.Author, &resultForum.Threads,
		&resultForum.VoteType, &resultForum.DeleteMessage, &resultForum.Created)

	if err != nil {
		return resultForum, err
	}
	return resultForum, nil
}

func (forum *Forums) GetForumsByUser(pool *pgx.ConnPool, author string) ([]Forums, error) {
	resultForums := []Forums{}
	rows, err := pool.Query(`SELECT slug, title, author, threads, vote_type, delete_message, created FROM forums WHERE author = $1 ORDER BY created DESC`, author)
	if err != nil {
		return nil, err
	}

	currentForumInRows := Forums{}
	for rows.Next() {
		rows.Scan(&currentForumInRows.Slug, &currentForumInRows.Title, &currentForumInRows.Author, &currentForumInRows.Threads,
			&currentForumInRows.VoteType, &currentForumInRows.DeleteMessage, &currentForumInRows.Created)

		resultForums = append(resultForums, currentForumInRows)
	}

	return resultForums, nil
}

func (forum *Forums) GetThreadsByForum(pool *pgx.ConnPool) ([]Threads, error) {
	rows, err := pool.Query(`SELECT "tID", author, created, forum, message, slug, title, votes FROM threads WHERE forum = $1 ORDER BY created DESC`, forum.Slug)
	if err != nil {
		return nil, err
	}

	resultThreads := []Threads{}

	currentThreadInRows := Threads{}
	for rows.Next() {
		rows.Scan(&currentThreadInRows.TID, &currentThreadInRows.Author, &currentThreadInRows.Created, &currentThreadInRows.Forum,
			&currentThreadInRows.Message, &currentThreadInRows.Slug, &currentThreadInRows.Title, &currentThreadInRows.Votes)
		resultThreads = append(resultThreads, currentThreadInRows)
	}
	return resultThreads, nil
}

package models

import (
	"time"

	"../../utils"
	"github.com/jackc/pgx"
)

type Threads struct {
	TID     int64     `json:"id"`
	Author  string    `json:"author"`
	Created time.Time `json:"created"`
	Forum   string    `json:"forum"`
	Message string    `json:"message"`
	Slug    string    `json:"slug"`
	Title   string    `json:"title"`
	Votes   int32     `json:"votes"`
}

func (thread *Threads) CreateThread(pool *pgx.ConnPool) error {
	var id int64

	tx, err := pool.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	tx.Exec("UPDATE forums SET threads=threads+1 WHERE slug=$1", thread.Forum)

	err = tx.QueryRow(`INSERT INTO threads (author, created, message, slug, title, forum)`+
		`VALUES ($1, $2, $3, $4, $5, $6) RETURNING "tID", created;`,
		thread.Author, thread.Created, thread.Message, thread.Slug, thread.Title, thread.Forum).Scan(&id, &thread.Created)
	if err != nil {
		if pgerr, ok := err.(pgx.PgError); ok {
			if pgerr.ConstraintName == "threads_slug_key" {
				return utils.UniqueError
			} else {
				return err
			}
		}
		return err
	}

	err = tx.Commit()
	if err != nil {
		return err
	}

	thread.TID = id

	return nil
}

func (thread *Threads) GetThreadBySlug(pool *pgx.ConnPool) error {
	return pool.QueryRow(`SELECT "tID", author, created, forum, message, title, votes, slug FROM threads WHERE slug = $1`,
		thread.Slug).Scan(&thread.TID, &thread.Author, &thread.Created, &thread.Forum,
		&thread.Message, &thread.Title, &thread.Votes, &thread.Slug)

}

func (thread *Threads) GetThreadById(pool *pgx.ConnPool) error {
	return pool.QueryRow(`SELECT author, created, forum, message, slug, title, votes FROM threads WHERE "tID" = $1`,
		thread.TID).Scan(&thread.Author, &thread.Created, &thread.Forum,
		&thread.Message, &thread.Slug, &thread.Title, &thread.Votes)
}

func (thread *Threads) UpdateThread(pool *pgx.ConnPool) error {
	err := pool.QueryRow(`UPDATE threads SET author = $1, message = $2, title = $3, forum = $4 `+
		`WHERE slug = $5 RETURNING "tID", slug, created;`,
		thread.Author, thread.Message, thread.Title, thread.Forum, thread.Slug).Scan(&thread.TID, &thread.Slug, &thread.Created)
	if err != nil {
		return err
	}
	return nil
}

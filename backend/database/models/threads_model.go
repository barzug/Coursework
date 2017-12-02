package models

import (
	"time"

	"../../utils"
	"github.com/jackc/pgx"
)

type Threads struct {
	Author  string    `json:"author"`
	Created time.Time `json:"created"`
	Forum   string    `json:"forum"`
	Message string    `json:"message"`
	Slug    string    `json:"slug"`
	Title   string    `json:"title"`
}

func (thread *Threads) CreateThread(pool *pgx.ConnPool) error {
	tx, err := pool.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	tx.Exec("UPDATE forums SET threads=threads+1 WHERE slug=$1", thread.Forum)

	err = tx.QueryRow(`INSERT INTO threads (author, created, message, slug, title, forum)`+
		`VALUES ($1, $2, $3, $4, $5, $6) RETURNING, created;`,
		thread.Author, thread.Created, thread.Message, thread.Slug, thread.Title, thread.Forum).Scan(&thread.Created)
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

	return nil
}

func (thread *Threads) GetThreadBySlug(pool *pgx.ConnPool) error {
	return pool.QueryRow(`SELECT author, created, forum, message, title, slug FROM threads WHERE slug = $1`,
		thread.Slug).Scan(&thread.Author, &thread.Created, &thread.Forum,
		&thread.Message, &thread.Title, &thread.Slug)

}

func (thread *Threads) UpdateThread(pool *pgx.ConnPool) error {
	err := pool.QueryRow(`UPDATE threads SET message = $1, title = $2`+
		`WHERE slug = $5 RETURNING slug, created;`,
		thread.Message, thread.Title, thread.Slug).Scan(&thread.Slug, &thread.Created)
	if err != nil {
		return err
	}
	return nil
}

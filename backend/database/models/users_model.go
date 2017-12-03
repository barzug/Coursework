package models

import (
	"github.com/jackc/pgx"

	"../../utils"
)

type Users struct {
	Email    string `json:"email"`
	Nickname string `json:"nickname"`
	Password string `json:"password"`
}

func (user *Users) CreateUser(pool *pgx.ConnPool) error {
	var nickname string
	err := pool.QueryRow(`INSERT INTO users(nickname, email, password)`+
		`VALUES ($1, $2, $3) RETURNING "nickname";`,
		user.Nickname, user.Email, user.Password).Scan(&nickname)
	if err != nil {
		if pgerr, ok := err.(pgx.PgError); ok {
			if pgerr.ConstraintName == "index_on_users_nickname" || pgerr.ConstraintName == "index_on_users_email" {
				return utils.UniqueError
			} else {
				return err
			}
		}
		return err
	}
	return nil
}

func (user *Users) GetUserByLogin(pool *pgx.ConnPool) (Users, error) {
	resultUser := Users{}
	err := pool.QueryRow(`SELECT nickname, email, password FROM users WHERE nickname = $1`,
		user.Nickname).Scan(&resultUser.Nickname, &resultUser.Email, &resultUser.Password)

	if err != nil {
		return resultUser, err
	}
	return resultUser, nil
}

func (user *Users) GetUserByEmail(pool *pgx.ConnPool) (Users, error) {
	resultUser := Users{}
	err := pool.QueryRow(`SELECT nickname, email, password FROM users WHERE email = $1`,
		user.Email).Scan(&resultUser.Nickname, &resultUser.Email, &resultUser.Password)

	if err != nil {
		return resultUser, err
	}
	return resultUser, nil
}

func (user *Users) GetUserByLoginAndEmail(pool *pgx.ConnPool) ([]Users, error) {
	rows, err := pool.Query(`SELECT nickname, email, password FROM users WHERE nickname = $1 OR email = $2`,
		user.Nickname, user.Email)

	resultUsers := []Users{}
	if err != nil {
		return resultUsers, err
	}

	currentUserInRows := Users{}
	for rows.Next() {
		rows.Scan(&currentUserInRows.Nickname, &currentUserInRows.Email, &currentUserInRows.Password)
		resultUsers = append(resultUsers, currentUserInRows)
	}
	return resultUsers, nil
}

func (user *Users) UpdateUser(pool *pgx.ConnPool) error {
	var nickname string
	err := pool.QueryRow(`UPDATE users SET email = $1, password = $2`+
		`WHERE nickname = $3 RETURNING "nickname";`,
		user.Email, user.Password, user.Nickname).Scan(&nickname)
	if err != nil {
		if pgerr, ok := err.(pgx.PgError); ok {
			if pgerr.ConstraintName == "index_on_users_email" {
				return utils.UniqueError
			} else {
				return err
			}
		}
		return err
	}
	return nil
}

func (user *Users) GetForumsByUser(pool *pgx.ConnPool) ([]Forums, error) {
	resultForums := []Forums{}
	rows, err := pool.Query(`SELECT slug, title, author, posts, threads, vote_type, delete_message, created, description FROM forums WHERE author = $1 ORDER BY created DESC`, user.Nickname)
	if err != nil {
		return nil, err
	}

	currentForumInRows := Forums{}
	for rows.Next() {
		rows.Scan(&currentForumInRows.Slug, &currentForumInRows.Title, &currentForumInRows.Author, &currentForumInRows.Threads,
			&currentForumInRows.VoteType, &currentForumInRows.DeleteMessage, &currentForumInRows.Created, &currentForumInRows.Description)

		resultForums = append(resultForums, currentForumInRows)
	}

	return resultForums, nil
}

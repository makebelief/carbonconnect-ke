package main

import (
	"log"
	"net/http"
	"path/filepath"
)

// Helper function to serve static error pages with a status code
func serveErrorPage(statusCode int, page string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(statusCode)
		filePath := filepath.Join(baseDir, "static", page)
		http.ServeFile(w, r, filePath)
	}
}

// Custom 404 handler
func notFoundHandler(w http.ResponseWriter, r *http.Request) {
	serveErrorPage(http.StatusNotFound, "404.html")(w, r)
}

// Custom method not allowed handler
func methodNotAllowedHandler(w http.ResponseWriter, r *http.Request) {
	serveErrorPage(http.StatusMethodNotAllowed, "error.html")(w, r)
}

// Forbidden access handler
func forbiddenHandler(w http.ResponseWriter, r *http.Request) {
	serveErrorPage(http.StatusForbidden, "403.html")(w, r)
}

// Server error handler
func serverErrorHandler(w http.ResponseWriter, r *http.Request, err error) {
	if err != nil {
		log.Printf("Server error: %v", err)
	}
	serveErrorPage(http.StatusInternalServerError, "500.html")(w, r)
}
#!/bin/bash

# Create uploads directory if it doesn't exist
mkdir -p uploads

# Create placeholder images with base64-encoded minimal SVGs
echo 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNENBRjUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQ9ImFuY2hvciIgZmlsbD0id2hpdGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5UcmVlIFBsYW50aW5nPC90ZXh0Pjwvc3ZnPg==' | base64 -d > uploads/sample_trees.jpg

echo 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjODFDNzg0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQ9ImFuY2hvciIgZmlsbD0id2hpdGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5NYWludGVuYW5jZTwvdGV4dD48L3N2Zz4=' | base64 -d > uploads/sample_maintenance.jpg

echo 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkZDMTA3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQ9ImFuY2hvciIgZmlsbD0id2hpdGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5CaW9nYXM8L3RleHQ+PC9zdmc+' | base64 -d > uploads/sample_biogas.jpg

echo 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjQjM5REZGIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQ9ImFuY2hvciIgZmlsbD0id2hpdGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5UZXJyYWNpbmc8L3RleHQ+PC9zdmc+' | base64 -d > uploads/sample_terracing.jpg

# Generate hashed password for mock users (password: password123)
HASHED_PASSWORD='$2a$10$6lP.0YyCFqGqu9ipUgvgzOqVgBJ9w7Ptx405gKlKkgn73IHUNzqRi'

# Update mock_data.sql with the hashed password
sed -i "s/\$2a\$10\$YourHashedPasswordHere/$HASHED_PASSWORD/g" mock_data.sql

# Import mock data
if command -v sqlite3 >/dev/null 2>&1; then
    sqlite3 carbonconnect.db < mock_data.sql
else
    echo "SQLite3 not found. Please install sqlite3 to import mock data."
    echo "You can try: 'sudo apt-get install sqlite3' or contact your system administrator."
fi

echo "Mock data setup completed!" 
<?php

return [
    'paths' => ['api/*', '*'], // Allow specific routes or all paths
    'allowed_methods' => ['*'], // Allow all HTTP methods
    'allowed_origins' => ['http://localhost:3000'], // Add your frontend URL
    'allowed_origins_patterns' => [], // Leave empty unless using regex
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Set true if needed for cookies
];

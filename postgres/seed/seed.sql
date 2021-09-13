BEGIN TRANSACTION;

INSERT INTO users (name,email) VALUES('Demo', 'demo@demo.com');
INSERT INTO login (email,hash) VALUES('demo@demo.com','$2b$10$AKq5ygfDl0Xnw.ArPlHTxudCFQeQVIaG8VtWMbTThEGz/huKuD83K');

COMMIT;
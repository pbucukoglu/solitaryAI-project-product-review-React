# Product Review Backend

Spring Boot REST API backend for the Product Review Application.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- (Optional) PostgreSQL for production

## Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Products

- `GET /api/products` - Get all products (supports pagination, sorting, category filter, search)
  - Query params: `page`, `size`, `sortBy`, `sortDir`, `category`, `search`
- `GET /api/products/{id}` - Get product by ID with reviews

### Reviews

- `POST /api/reviews` - Create a new review
  - Body: `{ productId, comment, rating (1-5), reviewerName (optional) }`
- `GET /api/reviews/product/{productId}` - Get reviews for a product

## Database

By default, the application uses H2 in-memory database for development. 
The database is initialized with sample products on startup.

Access H2 Console at: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:productreviewdb`
- Username: `sa`
- Password: (empty)

## Testing

Run tests:
```bash
mvn test
```

## Production

To use PostgreSQL in production, update `application.properties` and uncomment the PostgreSQL configuration section.

FROM python:3.12

# Set working directory
WORKDIR /app

# Copy backend files
FROM python:3.12

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

WORKDIR /app/taskmanager

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


# Go inside taskmanager folder
WORKDIR /app/taskmanager

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

# Expose port
EXPOSE 8000

# Run server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

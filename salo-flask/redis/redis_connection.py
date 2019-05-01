

# import the library
import redis
# Create connection object
r = redis.Redis( host='redis-10958.c14.us-east-1-2.ec2.cloud.redislabs.com', port=10958, password='NSojf0yrLjpKsVaJDorXnPY3CBCtwJAi')
# Set a value for the foo object
r.set('foo', 'bar')
# retrieve and print the value for the foo object
print(r.get('foo'))
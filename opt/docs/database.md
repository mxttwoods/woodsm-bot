---
nav:
  title: MongoDB
  description: 'Database Usage'
  order: 5
  category: 'Documentation'
---

<!-- markdownlint-disable MD025 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD030 -->

# Database

[MongoDB](https://mongodb.com/) and the [discord-bot](/)

Database development commands:

<code-block label="Bash" active>

```bash
# Start
brew services start mongodb-community@4.4

# Stop
brew services stop mongodb-community@4.4

# List Services
brew services list

# List Background Services
ps aux | grep -v grep | grep mongod

# Mongo Shell
mongo

# MongoDB Tools
mongotop
```

Example Record:

```json
{
  "_id": { "$oid": "60286f2f03220bf138397f5b" },
  "command": "hello",
  "args": "",
  "time": "Sat Feb 13 2021 7:29:13 PM",
  "__v": 0
}
```

</code-block>

## Resources

- [Mongoose](https://mongoosejs.com/docs/index.html)
- [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

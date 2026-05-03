---
tags:
  - github
  - ssh
type: permanent
date: 23-05-2025
parent: 
childs: 
aliases:
  - ssh
folgezettel: 
reference:
---
- Generate public/private SSH key-pair using `ssh-keygen` inside .ssh repo.
- Add the public key to Setting => SSH and GPG keys
- Clone/Push code using your generated private key
```bash
GIT_SSH_COMMAND="ssh -i ~/.ssh/private_key" <git command>
```

This method won't require you to enter username and password or access token every time, and more used for CI/CD.

 


<p align="center">
<img
    src="https://www.seraphid.io/assets/img/logo-dark.png"
    width="450px">
</p>
<h1></h1>
<p align="center">
  Seraph ID DID Driver
</p>

<p align="center">
  <a href="https://github.com/swisscom-blockchain/seraph-id-sdk/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green">
  </a>
</p>

# Overview

This is a [Universal Resolver](https://github.com/swisscom-blockchain/universal-resolver) driver for Seraph ID - a self-sovereign identity
solution on the NEO blockchain platform. This project provides an implementation for **did:neoid** identifiers.

# Example DIDs

```
did:neoid:priv:b4eeeb80d20bfb38b23001d0659ce0c1d96be0aa
```

# Build and Run

```sh
make build
make run
curl -X GET http://localhost:8080/1.0/identifiers/did:neoid:priv:b4eeeb80d20bfb38b23001d0659ce0c1d96be0aa
```

# References
- Seraph ID official page: https://seraphid.io
- Seraph ID demo application on
  [GitHub](https://github.com/swisscom-blockchain/seraph-id-demo)
- Seraph ID smart contract templates and examples on [GitHub](https://github.com/swisscom-blockchain/seraph-id-smart-contracts)
- Seraph ID SDK on
  [GitHub](https://github.com/swisscom-blockchain/seraph-id-sdk)
- Seraph ID chrome extension on [GitHub](https://github.com/swisscom-blockchain/seraph-id-chrome-extension)
- Seraph ID DID resolver on
  [GitHub](https://github.com/swisscom-blockchain/seraph-id-did-driver)



# License

- Open-source [MIT](https://github.com/swisscom-blockchain/seraph-id-did-driver/blob/master/LICENSE).

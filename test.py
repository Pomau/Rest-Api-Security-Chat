# from argon2 import PasswordHasher
# import time
# from datetime import datetime

# start_time = datetime.now()


# ph = PasswordHasher(hash_len=120, time_cost=250,memory_cost=10240)
# hash = ph.hash("sad")
# print(hash)
# print(len(hash))
# print(datetime.now() - start_time)
import hashlib
import ecdsa
import os
from binascii import hexlify
from base58 import b58encode

# Installation:
#     pip install base58 ecdsa

# Use that service to make sure that this generator works well:
#   1. navigate to https://bitcoinpaperwallet.com/bitcoinpaperwallet/generate-wallet.html#
#   2. Press "Skip"
#   3. Press "Enter my own key, ..."
#   4. Enter generated private key
#   5. Press "Apply"
#   6. Make sure that everything matches! PROFIT!


def random_secret_exponent(curve_order):
    while True:
        bytes = os.urandom(32)
        random_hex = hexlify(bytes)
        random_int = int(random_hex, 16)
        if random_int >= 1 and random_int < curve_order:
            return random_int


def generate_private_key():
    curve = ecdsa.curves.SECP256k1
    se = random_secret_exponent(curve.order)
    from_secret_exponent = ecdsa.keys.SigningKey.from_secret_exponent
    return from_secret_exponent(se, curve, hashlib.sha256).to_string()


def get_public_key_uncompressed(private_key_bytes):
    k = ecdsa.SigningKey.from_string(private_key_bytes, curve=ecdsa.SECP256k1)
    return b'\04' + k.get_verifying_key().to_string()  # 0x04 = uncompressed key prefix


def get_bitcoin_address(public_key_bytes, prefix=b'\x00'):
    ripemd160 = hashlib.new('ripemd160')
    ripemd160.update(hashlib.sha256(public_key_bytes).digest())
    r = prefix + ripemd160.digest()
    checksum = hashlib.sha256(hashlib.sha256(r).digest()).digest()[0:4]
    return b58encode(r + checksum)


def main():
    # private_key = generate_private_key()
    
    #     or:
    
    private_key = b"\xd1w\xe5a\xdd\xa1\x7f\x1ehC]h3\x0f\xb88z\x1a\r\xfc\xb1\x04\xeb_\x1e\xd8G\xcd\xce\xf5\xb8\xf5"

    public_key = get_public_key_uncompressed(private_key)
    address = get_bitcoin_address(public_key)

    print(f'private key: {private_key}')
    print(f'public key uncompressed: {hexlify(public_key)}')
    print(f'btc address: {address}')


if __name__ == '__main__':
    main()
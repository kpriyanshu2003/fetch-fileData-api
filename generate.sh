mkdir -p './tmp/data'
for i in {1..5}; do
    base64 /dev/urandom | head -c 100000 >"./tmp/data/$i.txt"
done

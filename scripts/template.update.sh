#!/bin/bash
#: ------------------------------------------
#: scripts/update.template.sh
#: ------------------------------------------
NAME=$1
REPO="veriKami/remark-deflist-revisited-$NAME"
URL="git@github.com:$REPO.git"

if [ -z "$NAME" ]; then
    echo "Usage: ./update.template.sh <template-name>"
    exit 1
fi

echo -e "Updating template: $NAME from $URL\n"

#: Create temporary directory for comparison
#: ------------------------------------------
TEMP=$(mktemp -d)

git clone --depth=1 "$URL" "$TEMP"
rm -rf "$TEMP/.git"

#: Compare with current version
#: ------------------------------------------
if diff -qr "templates/$NAME" "$TEMP" > /dev/null 2>&1; then
    echo -e "\nNo changes detected for $NAME"
    rm -rf "$TEMP"
    exit 0
fi

#: Replace with new version
#: ------------------------------------------
rm -rf "templates/$NAME"
mv "$TEMP" "templates/$NAME"

#: Commit changes
#: ------------------------------------------
git add "templates/$NAME"
git commit --quiet -m "Update: $REPO"
echo -e "\nTemplate $NAME updated and committed"

git push --quiet origin main
echo "Changes pushed to origin main"

#: ------------------------------------------
#: EOF

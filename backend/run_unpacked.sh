#!/bin/bash
cd "$(dirname "$0")"
CP="target/classes"
for jar in target/lib/*.jar; do
    CP="$CP:$jar"
done
java -cp "$CP" com.Love.Romantic.RomanticApplication

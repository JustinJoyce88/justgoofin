#!/bin/bash
echo '> Cleaning React Native Project'
echo '> Removing metro and watchman temp DIRs'
rm -rf $TMPDIR/react-*  rm -rf $TMPDIR/metro-* 
rm -rf $TMPDIR/haste-* watchman watch-del-all
echo '> Deleting node modules and reinstalling via yarn'
rm -rf node_modules
yarn install
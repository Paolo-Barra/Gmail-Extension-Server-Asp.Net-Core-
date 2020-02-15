#!/bin/bash 
typescript-ref 

case "$(uname -s)" in 

   Darwin)
    echo 'Host=Mac OS X'
    # The 'sed' included on os x is not fully compatible with GNU sed
    # Install GNU Sed with 'homebrew install gnu-sed, It will be installed as 'gsed'
    gsed -i 's/IList<RecipeCriteriaEmail>;/RecipeCriteriaEmail[];/g' ReFind.dtos.ts
    ;;

   Linux)
    echo 'Host=Linux'
    sed -i 's/IList<RecipeCriteriaEmail>;/RecipeCriteriaEmail[];/g' ReFind.dtos.ts
    ;;

   *)
     echo 'other OS' 
     sed -i 's/IList<RecipeCriteriaEmail>;/RecipeCriteriaEmail[];/g' ReFind.dtos.ts
     ;;

esac


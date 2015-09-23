(ns medical.infra.db
  (:require [korma.core :as core]
            [korma.db :as db]
            [environ.core :refer [env]]))


(def db {:classname         "com.mysql.jdbc.Driver"
         :subprotocol       "mysql"
         :subname           "//localhost:3306/medical"
         :delimiters        "`"
         :useUnicode        "yes"
         :characterEncoding "UTF-8"
         :user              "root"
         :password          "livefree"})

(db/defdb medical db)

;; Entities
(declare address)
(core/defentity address)

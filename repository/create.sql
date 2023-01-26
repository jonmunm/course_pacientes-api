CREATE TABLE public.pacientes (
    id serial,
    nombre character varying(64) NOT NULL,
    apellidos character varying(64) NOT NULL,
    edad integer NOT NULL,
    created_at timestamp default now(),
    update_at timestamp,
    deleted_at timestamp
    PRIMARY KEY(id)
);


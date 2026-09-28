
-- POLÍTICAS DE SEGURIDAD ROW LEVEL SECURITY (RLS) PARA SUPABASE
-- Kartódromo & Motódromo La Sabaneta
-- Ejecuta este script en el SQL Editor de tu Dashboard de Supabase.
-- Protege tu base de datos contra accesos no autorizados y manipulación externa.

-- 1. Habilitar RLS en todas las tablas clave
ALTER TABLE IF EXISTS servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS perfiles ENABLE ROW LEVEL SECURITY;

-- TABLA: SERVICIOS
-- Cualquier visitante público (anónimo o logueado) puede leer las actividades activas
DROP POLICY IF EXISTS "Lectura pública de servicios activos" ON servicios;
CREATE POLICY "Lectura pública de servicios activos"
ON servicios FOR SELECT
TO anon, authenticated
USING (activo = true);

-- Solo usuarios con rol 'admin' pueden insertar, modificar o eliminar servicios
DROP POLICY IF EXISTS "Solo admin puede gestionar servicios" ON servicios;
CREATE POLICY "Solo admin puede gestionar servicios"
ON servicios FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM perfiles 
    WHERE perfiles.id = auth.uid() AND perfiles.rol = 'admin'
  )
);

-- TABLA: RESERVAS
-- Los usuarios públicos pueden crear reservas (o compras)
DROP POLICY IF EXISTS "Permitir crear reservas públicas" ON reservas;
CREATE POLICY "Permitir crear reservas públicas"
ON reservas FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Validaciones de integridad básicas
  numero_personas > 0 
  AND fecha >= CURRENT_DATE
);

-- Los usuarios públicos pueden consultar reservas solo para el cálculo de cupos
DROP POLICY IF EXISTS "Lectura de cupos y disponibilidad" ON reservas;
CREATE POLICY "Lectura de cupos y disponibilidad"
ON reservas FOR SELECT
TO anon, authenticated
USING (true);

-- Solo administradores y empleados autenticados pueden modificar el estado de reservas
DROP POLICY IF EXISTS "Solo admin puede actualizar estado de reservas" ON reservas;
CREATE POLICY "Solo admin puede actualizar estado de reservas"
ON reservas FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM perfiles 
    WHERE perfiles.id = auth.uid() AND perfiles.rol IN ('admin', 'empleado')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM perfiles 
    WHERE perfiles.id = auth.uid() AND perfiles.rol IN ('admin', 'empleado')
  )
);

-- Solo administradores pueden eliminar reservas
DROP POLICY IF EXISTS "Solo admin puede borrar reservas" ON reservas;
CREATE POLICY "Solo admin puede borrar reservas"
ON reservas FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM perfiles 
    WHERE perfiles.id = auth.uid() AND perfiles.rol = 'admin'
  )
);


-- TABLA: PERFILES
-- Cada usuario autenticado puede leer su propio perfil para verificar su rol
DROP POLICY IF EXISTS "Usuarios leen su propio perfil" ON perfiles;
CREATE POLICY "Usuarios leen su propio perfil"
ON perfiles FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Solo administradores pueden ver todos los perfiles o asignar roles
DROP POLICY IF EXISTS "Admin puede gestionar perfiles" ON perfiles;
CREATE POLICY "Admin puede gestionar perfiles"
ON perfiles FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM perfiles 
    WHERE perfiles.id = auth.uid() AND perfiles.rol = 'admin'
  )
);
